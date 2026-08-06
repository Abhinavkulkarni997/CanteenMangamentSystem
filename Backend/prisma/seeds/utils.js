import { faker } from "@faker-js/faker";

export const randomPrice = () =>
  faker.helpers.arrayElement([5, 10, 15, 20, 25, 30]);

export const randomStatus = () =>
  faker.helpers.arrayElement([
    "BOOKED",
    "COLLECTED",
    "CANCELLED",
  ]);

export const randomPayment = () =>
  faker.helpers.arrayElement([
    "SUCCESS",
    "FAILED",
  ]);

export const randomSession = () =>
  faker.helpers.arrayElement([
    "BREAKFAST",
    "LUNCH",
    "DINNER",
  ]);

export { faker };