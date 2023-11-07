import cors from "cors";
import express from "express";
import championRouter from "./routes/champions.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/champions", championRouter);

const port = process.env.PORT || 4000;

// GET routing
app.get("/", (request, response) => {
  response.send("Node Express League Data Base");
});

// Listeners
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
