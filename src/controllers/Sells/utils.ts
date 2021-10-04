import { Sells } from "@interfaces/sells";

interface OutputQuery {
  createdAt?: {
    $gte?: Date | string;
    $lte?: Date | string;
  };
}

const startOfMonthDate = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const buildQuery = () => {
  const query: OutputQuery = {};

  query.createdAt = { $gte: startOfMonthDate(new Date()) };

  return query;
};

export const getTotalAmount = (items: Sells[]) =>
  items.reduce(
    (previousValue, currentValue) => previousValue + currentValue.amount,
    0
  );
