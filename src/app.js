import express from "express";
import dotenv from "dotenv";
import movieRoutes from "./routes/movies.routes.js";
import userRoutes from './routes/user.routes.js'
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({}));

app.use("/api/entries", movieRoutes);
app.use('/api/entries/users', userRoutes)

app.get("/", (req, res) => {
  res.status(200).json({message: "Server is running."});
});

export default app;
