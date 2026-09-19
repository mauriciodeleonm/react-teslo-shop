export const currencyFormatter = (amount: number) => {
  return amount.toLocaleString("es-Es", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
};
