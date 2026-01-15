import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import issueRoutes from "./routes/issueRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/issues", issueRoutes);

app.listen(5000, () => {
  console.log("🔥 Backend running on port 5000");
});

