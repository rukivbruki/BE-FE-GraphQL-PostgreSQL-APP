import { Client } from "../types";

export const addDataToDb = async (
  client: Client,
  table: string,
  columns: string[],
  values: (string | number | undefined)[]
) => {
  try {
    const cols = columns.map((col) => `"${col}"`).join(", ");
    const query = {
      text: `INSERT INTO "${table}" (${cols})
                   VALUES (${values.map((v, i) => `$${i + 1}`).join(", ")})`,
      values,
    };
    await client.query(query);
  } catch (err) {
    console.error(err);
  }
};
