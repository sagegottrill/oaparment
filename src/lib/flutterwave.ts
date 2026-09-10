const FLW_BASE = "https://api.flutterwave.com/v3";

function secretKey() {
  const key = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!key) throw new Error("Missing FLUTTERWAVE_SECRET_KEY");
  return key;
}

export type FlutterwaveInitInput = {
  txRef: string;
  amount: number;
  currency?: string;
  redirectUrl: string;
  customer: {
    email: string;
    name: string;
    phonenumber: string;
  };
  meta?: Record<string, string | number | boolean | null>;
  customizations?: {
    title?: string;
    description?: string;
    logo?: string;
  };
};

export type FlutterwaveInitResult = {
  link: string;
  status: string;
  message: string;
};

export async function initializeFlutterwavePayment(
  input: FlutterwaveInitInput
): Promise<FlutterwaveInitResult> {
  const response = await fetch(`${FLW_BASE}/payments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: input.txRef,
      amount: input.amount,
      currency: input.currency ?? "NGN",
      redirect_url: input.redirectUrl,
      payment_options: "card,ussd,banktransfer,account",
      customer: input.customer,
      meta: input.meta,
      customizations: input.customizations ?? {
        title: "The O Apartments",
        description: "Suite booking payment",
      },
    }),
  });

  const payload = (await response.json()) as {
    status: string;
    message: string;
    data?: { link?: string };
  };

  if (!response.ok || payload.status !== "success" || !payload.data?.link) {
    throw new Error(payload.message || "Flutterwave payment init failed");
  }

  return {
    link: payload.data.link,
    status: payload.status,
    message: payload.message,
  };
}

export type FlutterwaveVerifyResult = {
  status: string;
  amount: number;
  currency: string;
  txRef: string;
  id: number;
  customerEmail?: string;
};

export async function verifyFlutterwaveTransaction(
  transactionId: string | number
): Promise<FlutterwaveVerifyResult> {
  const response = await fetch(`${FLW_BASE}/transactions/${transactionId}/verify`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${secretKey()}`,
      "Content-Type": "application/json",
    },
  });

  const payload = (await response.json()) as {
    status: string;
    message: string;
    data?: {
      status: string;
      amount: number;
      currency: string;
      tx_ref: string;
      id: number;
      customer?: { email?: string };
    };
  };

  if (!response.ok || payload.status !== "success" || !payload.data) {
    throw new Error(payload.message || "Flutterwave verify failed");
  }

  return {
    status: payload.data.status,
    amount: payload.data.amount,
    currency: payload.data.currency,
    txRef: payload.data.tx_ref,
    id: payload.data.id,
    customerEmail: payload.data.customer?.email,
  };
}

export function isValidFlutterwaveWebhook(signature: string | null) {
  const hash = process.env.FLUTTERWAVE_SECRET_HASH;
  if (!hash) return false;
  return Boolean(signature) && signature === hash;
}
