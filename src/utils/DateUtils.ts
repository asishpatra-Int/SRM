// Formats free-typed digits as dd-mm-yyyy while the user types.
export function formatDateOfBirthInput(text: string) {
  const digits = text.replace(/\D/g, "").slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)];
  return parts.filter(Boolean).join("-");
}
