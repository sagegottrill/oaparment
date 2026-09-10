const SCRIPT_SRC = "https://checkout.flutterwave.com/v3.js";

export type FlutterwaveInlinePayload = {
  txRef: string;
  amount: number;
  customer: {
    email: string;
    name: string;
    phonenumber: string;
  };
  meta?: Record<string, string>;
  title?: string;
  description?: string;
  redirectUrl: string;
};

declare global {
  interface Window {
    FlutterwaveCheckout?: (options: Record<string, unknown>) => { close?: () => void };
  }
}

export function getFlutterwavePublicKey() {
  return process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY ?? "";
}

export function loadFlutterwaveScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Flutterwave can only run in the browser."));
  }
  if (window.FlutterwaveCheckout) return Promise.resolve();

  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve, reject) => {
      if (window.FlutterwaveCheckout) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Could not load Flutterwave checkout.")));
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Could not load Flutterwave checkout."));
    document.body.appendChild(script);
  });
}

export async function openFlutterwaveCheckout(input: FlutterwaveInlinePayload) {
  const publicKey = getFlutterwavePublicKey();
  if (!publicKey) {
    throw new Error("Missing NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY.");
  }

  await loadFlutterwaveScript();
  if (!window.FlutterwaveCheckout) {
    throw new Error("Flutterwave checkout failed to initialize.");
  }

  window.FlutterwaveCheckout({
    public_key: publicKey,
    tx_ref: input.txRef,
    amount: input.amount,
    currency: "NGN",
    payment_options: "card,ussd,banktransfer,account",
    redirect_url: input.redirectUrl,
    customer: {
      email: input.customer.email,
      name: input.customer.name,
      phone_number: input.customer.phonenumber,
    },
    meta: input.meta,
    customizations: {
      title: input.title ?? "The O Apartments",
      description: input.description ?? "Suite booking payment",
    },
  });
}
