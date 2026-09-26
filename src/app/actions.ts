"use server";

import { interests } from "@/lib/consultation";

export type ConsultationState = {
  status: "idle" | "error" | "success";
  errors?: {
    name?: string;
    phone?: string;
    email?: string;
    interest?: string;
  };
  // Sent back so the form can refill itself — React resets uncontrolled
  // inputs once an action runs.
  values?: {
    name: string;
    phone: string;
    email: string;
    interest: string;
  };
};

export async function requestConsultation(
  _prevState: ConsultationState,
  formData: FormData,
): Promise<ConsultationState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const interest = String(formData.get("interest") ?? "").trim();

  const errors: NonNullable<ConsultationState["errors"]> = {};
  if (name.length < 2) errors.name = "Enter your full name";
  if (phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter an email like name@company.com";
  if (!(interests as readonly string[]).includes(interest))
    errors.interest = "Choose what you're looking for";

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values: { name, phone, email, interest } };
  }

  // PLACEHOLDER — the lead is validated but not delivered anywhere yet.
  // Forward name, phone, email and interest to the CRM or mailer here.

  return { status: "success" };
}

export type EnquiryValues = {
  name: string;
  phone: string;
  email: string;
  company: string;
  city: string;
  interest: string;
  quantity: string;
  message: string;
  product: string;
};

export type EnquiryState = {
  status: "idle" | "error" | "success";
  errors?: Partial<Record<"name" | "phone" | "email" | "interest", string>>;
  values?: EnquiryValues;
};

/** The fuller enquiry form on /contact. */
export async function sendEnquiry(_prevState: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const read = (key: keyof EnquiryValues) => String(formData.get(key) ?? "").trim().slice(0, 2000);
  const values: EnquiryValues = {
    name: read("name"),
    phone: read("phone"),
    email: read("email"),
    company: read("company"),
    city: read("city"),
    interest: read("interest"),
    quantity: read("quantity"),
    message: read("message"),
    product: read("product"),
  };

  const errors: NonNullable<EnquiryState["errors"]> = {};
  if (values.name.length < 2) errors.name = "Enter your full name";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Enter a 10-digit phone number";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter an email like name@company.com";
  if (!(interests as readonly string[]).includes(values.interest)) errors.interest = "Choose what you're looking for";

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  // PLACEHOLDER — the enquiry is validated but not delivered anywhere yet.
  // Forward `values` to the CRM or mailer here.

  return { status: "success" };
}
