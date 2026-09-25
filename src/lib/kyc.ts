import type { KycIdType } from "@/lib/supabase/types";

export const KYC_BUCKET = "kyc-documents";

/** Guest-facing label for each accepted ID type. */
export const KYC_ID_TYPES: { value: KycIdType; label: string }[] = [
  { value: "nin", label: "NIN (National Identity Number)" },
  { value: "passport", label: "International Passport" },
  { value: "drivers_licence", label: "Driver's Licence" },
];

export const KYC_MAX_DOCUMENT_BYTES = 5 * 1024 * 1024; // 5 MB, mirrors the storage bucket limit

export const KYC_ACCEPTED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export function kycIdTypeLabel(idType: string) {
  return KYC_ID_TYPES.find((item) => item.value === idType)?.label ?? idType;
}

export function kycStatusLabel(status: string) {
  if (status === "approved") return "Verified";
  if (status === "rejected") return "Rejected";
  return "Pending review";
}

export function isKycDocumentAccepted(file: File) {
  return (
    file.size <= KYC_MAX_DOCUMENT_BYTES &&
    (KYC_ACCEPTED_MIME_TYPES.includes(file.type) ||
      // Some browsers report empty type for PDFs picked from certain apps.
      (file.type === "" && /\.pdf$/i.test(file.name)))
  );
}

/** Stable object path so re-submissions for the same guest replace cleanly. */
export function kycDocumentPath(guestEmail: string, fileName: string) {
  const safeEmail = guestEmail.trim().toLowerCase().replace(/[^a-z0-9@._-]/g, "_");
  const extension = fileName.includes(".") ? fileName.slice(fileName.lastIndexOf(".") + 1) : "bin";
  const stamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  return `guests/${safeEmail}/${stamp}-${random}.${extension.toLowerCase()}`;
}
