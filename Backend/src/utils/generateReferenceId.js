export const generateReferenceId = (prefix = "ADMIN") => {
  const now = new Date();

  const date =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  return `${prefix}-${date}-${random}`;
};