export const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

/** Contact page link with the enquiry form pre-filled for a product. */
export const enquiryHref = (product?: string) =>
  product ? `/contact?product=${encodeURIComponent(product)}#enquiry` : "/contact#enquiry";
