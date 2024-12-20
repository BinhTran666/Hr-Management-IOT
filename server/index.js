import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import e from "express";
import employeeRoutes from "./routes/employee.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";
import debugRoutes from "./routes/debug.js";
import checkinRoutes from "./routes/history.js";
import chatbotRoutes from "./routes/chatBot.js";
// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Routes

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use("/api/employee", employeeRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/debug", debugRoutes);
app.use("/api/checkin", checkinRoutes);
app.use("/api/chatbot", chatbotRoutes);

app.use(cors({
  origin: "http://localhost:3000", // URL FE
  credentials: true, // Để cho phép gửi cookie
}));

// Mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log("Error: ", error));
