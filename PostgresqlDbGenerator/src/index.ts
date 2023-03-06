require('dotenv').config()

import { config } from "./config";
import { connectToDb } from "./db";
import { Client, Row } from "./types";
import { readCsvFile, addDataToDb } from "./utils";

const csvPaths = config.csv;

const addCategoryToDb = async (
  client: Client,
  id: string,
  name: string,
  color: string
) => {
  const columns = ["id", "name", "color"];
  const values = [id, name, color];
  try {
    await addDataToDb(client, "Category", columns, values);
    console.log(`Category with id ${id} added to database`);
  } catch (err) {
    console.error(
      `Error adding category with id ${id} to database: ${
        (err as { message: string }).message
      }`
    );
  }
};

const addAccountToDb = async (
  client: Client,
  id: string,
  name: string,
  bank: string
) => {
  const columns = ["id", "name", "bank"];
  const values = [id, name, bank];
  try {
    await addDataToDb(client, "Account", columns, values);
    console.log(`Account with id ${id} added to database`);
  } catch (err) {
    console.error(
      `Error adding account with id ${id} to database: ${
        (err as { message: string }).message
      }`
    );
  }
};

const addTransactionsToDb = async (
  client: Client,
  id: string,
  accountId: string,
  categoryId: string,
  reference: string,
  amount: string,
  currency: string,
  date: string
) => {
  const columns = [
    "id",
    "accountId",
    "categoryId",
    "reference",
    "amount",
    "currency",
    "date",
  ];
  const values = [id, accountId, categoryId, reference, amount, currency, date];
  try {
    await addDataToDb(client, "Transaction", columns, values);
    console.log(`Transaction with id ${id} added to database`);
  } catch (err) {
    console.error(
      `Error adding transaction with id ${id} to database: ${
        (err as { message: string }).message
      }`
    );
  }
};

const addDataFromCsv = async (
  client: Client,
  filePath: string,
  addDataToDbFunc: Function,
  columns: string[]
) => {
  await readCsvFile(filePath, async function (row: Row) {
    const values = columns.map((column) => row[column]);
    await addDataToDbFunc(client, ...values);
  });
};

const run = async () => {
  let client;
  try {
    client = await connectToDb();
    await addDataFromCsv(client, csvPaths.accounts, addAccountToDb, [
      "id",
      "name",
      "bank",
    ]);
    await addDataFromCsv(client, csvPaths.categories, addCategoryToDb, [
      "id",
      "name",
      "color",
    ]);
    await addDataFromCsv(client, csvPaths.transactions, addTransactionsToDb, [
      "id",
      "accountId",
      "categoryId",
      "reference",
      "amount",
      "currency",
      "date",
    ]);
  } catch (err) {
    console.error(err);
  }
};

run();
