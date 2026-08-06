import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/error.middleware.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "NGRI Canteen API Running"
    });
});

app.use("/api/v1", routes);
app.use(errorHandler);

export default app;
console.log("process.cwd():", process.cwd());