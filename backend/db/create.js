import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(import.meta.dirname, "items.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Failed to connect to Sqlite DB", err);
  } else {
    console.log("Connected to Sqlite DB");
  }
});

export default db;
