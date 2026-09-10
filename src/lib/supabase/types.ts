export type UserRole = "guest" | "admin";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "refunded";

export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type Suite = {
  id: string;
  slug: string;
  title: string;
  price_per_night: number;
  caution_fee: number;
  max_guests: number;
  max_rooms: number;
  description: string;
  images: string[];
  offers: { icon: string; label: string }[];
  accommodation: string[];
  active: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  user_id: string | null;
  suite_id: string;
  check_in: string;
  check_out: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  stay_total: number;
  caution_fee: number;
  total: number;
  status: BookingStatus;
  payment_status: PaymentStatus;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  notes: string | null;
  flutterwave_tx_ref: string | null;
  flutterwave_tx_id: string | null;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      suites: {
        Row: Suite;
        Insert: Partial<Suite> & { id: string; slug: string; title: string };
        Update: Partial<Suite>;
        Relationships: [];
      };
      bookings: {
        Row: Booking;
        Insert: {
          id?: string;
          user_id?: string | null;
          suite_id: string;
          check_in: string;
          check_out: string;
          nights: number;
          rooms?: number;
          adults?: number;
          children?: number;
          stay_total: number;
          caution_fee: number;
          total: number;
          status?: BookingStatus;
          payment_status?: PaymentStatus;
          guest_name: string;
          guest_email: string;
          guest_phone: string;
          notes?: string | null;
          flutterwave_tx_ref?: string | null;
          flutterwave_tx_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Booking>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
