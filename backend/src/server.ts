import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { startPayuReconciler } from "./utils/payuReconciler";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Luxe Yatra Backend API server running on port ${PORT}`);
  startPayuReconciler();
});
