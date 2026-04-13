import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../data/db.json");

// Read DB
export const readDB = () => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Write DB
export const writeDB = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};