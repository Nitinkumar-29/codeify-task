const express = require("express");
const cors = require("cors");
const connectToMongo = require("./db");
require("dotenv").config(); // Make sure to load environment variables

connectToMongo();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fix for express.urlencoded
const allowedOrigins = [
  "https://codeify-task-frontend.vercel.app",
  "http://localhost:3000", // Add other allowed origins here
];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE"],
};
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  // Fix for req, res
  return res.json("Hello World!");
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/category", require("./routes/category"));
app.use("/api/product", require("./routes/product"));

app.listen(process.env.PORT, () => {
  // Fix for listen
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
