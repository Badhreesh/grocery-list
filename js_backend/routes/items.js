import express from "express";
import db from "../db/create.js";
const router = express.Router();

router.get("/", (req, res) => {
  let sql = `SELECT * from items`;
  db.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    return res.json(rows);
  });
});

router.post("/", (req, res) => {
  let sql = `INSERT INTO items(item) VALUES (?)`;
  let { item } = req.body;
  item = item[0].toUpperCase() + item.slice(1);
  db.run(sql, [item], (err) => {
    if (err) return console.error(err.message);
  });
  res.json({ message: `${item} has been added to the list.` });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  let sql = `DELETE FROM items WHERE id =?`;
  db.run(sql, [id], (err) => {
    if (err) return console.error(err.message);
    return res.json({ message: `${req.body} has been deleted from the list.` });
  });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  let sql = `SELECT * FROM items WHERE id =?`;
  db.get(sql, [id], (err, row) => {
    if (err) return console.error(err.message);
    return res.json(row);
  });
});

export default router;
