const bnDigits = "০১২৩৪৫৬৭৮৯";


export function toBanglaNumber(value: number | string): string {
  return String(value).replace(/\d/g, (d) => bnDigits[Number(d)]);
}


export function parseBanglaNumber(value: number | string): number {
  if (typeof value === "number") return value;
  const english = value
    .replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d)))
    .replace(/,/g, "");
  return parseFloat(english);
}


export function formatPrice(value: number): string {
  return `${value.toLocaleString("bn-BD")} টাকা`;
}