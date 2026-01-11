import db from "./create.js";

function initDb() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS items (
                id INTEGER PRIMARY KEY,
                item TEXT NOT NULL,
                done INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`,
        (err) => {
          if (err) return reject(err);
          resolve();
        }
      );
    });
  });
}

export default initDb;
