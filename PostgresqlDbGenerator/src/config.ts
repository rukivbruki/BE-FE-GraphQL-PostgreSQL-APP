import * as process from "process";

export const config = {
  db: {
    user: process.env.POSTGRES_USER,
    host: "localhost",
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
  },
  csv: {
    accounts: "./data/accounts.csv",
    categories: "./data/categories.csv",
    transactions: "./data/transactions.csv",
  },
};
