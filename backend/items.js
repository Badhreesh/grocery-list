import express from "express";
import db from "./db/create.js";
const router = express.Router();

const items = [
  {
    id: 1,
    name: "Milk",
  },
  {
    id: 2,
    name: "Mushroom",
  },
];

router.get("/", (req, res) => {
  res.json(items);
});

router.post("/", (req, res) => {
  let sql = `INSERT INTO items(item) VALUES (?)`;
  let { item } = req.body;
  (item = item[0].toUpperCase() + item.slice(1)),
    db.run(sql, [item], (err) => {
      if (err) return console.error(err.message);
    });
  res.json({ message: `${item} has been added to the list.` });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  res.json(items.filter((item) => item.id === id));
});

export default router;
