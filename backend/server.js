import express from "express";
import { connectDB } from "./config/db.js";

const app = express();


app.get("/products", (req, res) => {
  res.send("Server is ready!");
});

// This function will execute if the backend runs: Enter npm run dev on backend terminal
app.listen(5000, () => {
   connectDB();
  // This message log indicates that the backend is running
  console.log("Server started at http://localhost:5000");
});