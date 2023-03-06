import { Row } from "../types";
import fs from "fs";
import { parse } from "csv-parse";

export const readCsvFile = (
  filePath: string,
  rowHandler: (row: Row) => Promise<void>
) => {
  const parser = parse({ columns: true });
  const readStream = fs.createReadStream(filePath);

  let recordsCount = 0;

  parser.on("readable", async () => {
    let record;
    while ((record = parser.read())) {
      recordsCount++;
      await rowHandler(record);
      record = null;
    }
  });

  return new Promise<void>((resolve, reject) => {
    parser.on("error", (err) => reject(err));
    parser.on("end", () => {
      resolve();
    });
    readStream.pipe(parser);
  });
};
