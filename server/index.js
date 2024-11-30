import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import e from "express";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import authRoutes from "./routes/auth.js";

// Configuration
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
// Routes

app.use("/api/client", clientRoutes);
app.use("/api/general", generalRoutes);
app.use("/api/management", managementRoutes);
app.use("/api/auth", authRoutes);

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
