export function formatCurrency(amount: number | string): string {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  // Remove any non-numeric characters from the input
  const numericAmount = parseFloat(amount.toString().replace(/[^0-9.-]+/g, ""));

  return formatter.format(numericAmount);
}
