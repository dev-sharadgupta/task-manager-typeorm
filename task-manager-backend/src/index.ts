import "dotenv/config";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./datasources/data-source";
import authRoutes from "./modules/auth/routes/auth.routes"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api", (_req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });
