import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

// app config
const app = express();
const port = process.env.Port || 3000;

connectDB();
connectCloudinary();

// middleware
app.use(express.json());

// Proper CORS setup
app.use(
  cors({
    origin: "http://localhost:5174", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true, // Allow cookies or tokens if needed
  })
);




// api endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

app.get("/", (req, res) => {
  res.send("working....");
});

app.listen(port, () => {
  console.log("server started..." + port);
});
