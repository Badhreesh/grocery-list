import app from "./app.js";
import initDb from "./db/initialize.js";

const port = 3000;

async function startServer() {
  try {
    await initDb();
    console.log("DB initialized");

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to initialize server", err);
    process.exit(1);
  }
}

startServer();
