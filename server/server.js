const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require("path");
const cors = require('cors');

//dotenv config
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// mongo db connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

app.use(cors({
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));  // Enable CORS if needed

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

// static files
app.use(express.static(path.join(__dirname, "../client/build")));  // Adjusted path

// fallback for any other route (to serve React app)
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));  // Adjusted path
});

// port
const port = process.env.PORT || 8080;

// listen port
app.listen(port, () => {
    console.log(
        `Server Running in ${process.env.NODE_ENV} Node on port ${process.env.PORT || port}`
            .bgCyan.white
    );
});
