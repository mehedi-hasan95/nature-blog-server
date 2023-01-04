const express = require("express");
const app = express();
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/User");

require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to the Nature Blog Server"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
    res.send("Nature Blog Server");
});

app.listen(port, () => {
    console.log(`Nature Blog Server app listening on port ${port}`);
});
