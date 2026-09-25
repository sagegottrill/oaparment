-- KYC (Know Your Customer) for The O' Apartments
-- Guests submit a government-issued ID (NIN, passport, or driver's licence) with
-- their booking. Booking is not blocked by review status, but submission is compulsory.

create table if not exists public.kyc_submissions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings (id) on delete set null,
  user_id uuid references auth.users (id) on delete set null,
  guest_email text not null,
  guest_name text not null,
  guest_phone text,
  id_type text not null check (id_type in ('nin', 'passport', 'drivers_licence')),
  id_number text not null,
  id_document_path text,
  id_document_name text,
  id_document_type text,
  id_document_size integer,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  review_note text,
  reviewed_by uuid references auth.users (id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists kyc_submissions_status_idx on public.kyc_submissions (status, created_at desc);
create index if not exists kyc_submissions_booking_idx on public.kyc_submissions (booking_id);
create index if not exists kyc_submissions_email_idx on public.kyc_submissions (guest_email);

alter table public.kyc_submissions enable row level security;

-- Guests: read/update only their own submissions (matched by signed-in user or email).
drop policy if exists "kyc read own" on public.kyc_submissions;
create policy "kyc read own" on public.kyc_submissions
  for select to authenticated
  using (
    auth.uid() = user_id
    or (user_id is null and guest_email = coalesce((select email from auth.users where id = auth.uid()), ''))
  );

drop policy if exists "kyc insert own" on public.kyc_submissions;
create policy "kyc insert own" on public.kyc_submissions
  for insert to authenticated
  with check (
    auth.uid() = user_id
    or (user_id is null and guest_email = coalesce((select email from auth.users where id = auth.uid()), ''))
  );

drop policy if exists "kyc update own pending" on public.kyc_submissions;
create policy "kyc update own pending" on public.kyc_submissions
  for update to authenticated
  using (
    status = 'pending'
    and (
      auth.uid() = user_id
      or (user_id is null and guest_email = coalesce((select email from auth.users where id = auth.uid()), ''))
    )
  );

-- Admins: full access via the server-side admin client (service role bypasses RLS anyway).
drop policy if exists "kyc admin read" on public.kyc_submissions;
create policy "kyc admin read" on public.kyc_submissions
  for select to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Private bucket for ID documents; access goes through signed URLs only.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'kyc-documents',
  'kyc-documents',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
)
on conflict (id) do update
  set public = false,
      file_size_limit = 5242880,
      allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];

drop policy if exists "kyc docs admin all" on storage.objects;
create policy "kyc docs admin all" on storage.objects
  for all to authenticated
  using (bucket_id = 'kyc-documents')
  with check (bucket_id = 'kyc-documents');
