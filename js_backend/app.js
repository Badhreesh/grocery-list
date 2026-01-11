import cors from "cors";
import express from "express";
import itemsRouter from "./routes/items.js";

const app = express();

const myLogger = function (req, res, next) {
  req.requestTime = new Date(Date.now()).toString();
  console.log(`Logged on ${req.requestTime}`);
  next();
};

app.use(express.json());
app.use(myLogger);
app.use(
  cors({
    origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
  })
);
app.use("/items", itemsRouter);

export default app;
