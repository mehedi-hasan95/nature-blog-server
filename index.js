const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
mongoose.set("strictQuery", true);
const authRoute = require("./Routes/Auth");
const userRoute = require("./Routes/User");
const postRoute = require("./Routes/Post");
const catRoute = require("./Routes/Category");

require("dotenv").config();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to the Nature Blog Server"))
    .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/category", catRoute);

// Image Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

app.post("/api/image", upload.single("file"), function (req, res, next) {
    res.status(200).json("Image have been uploaded");
});

// Run Node
app.get("/", (req, res) => {
    res.send("Nature Blog Server");
});

app.listen(port, () => {
    console.log(`Nature Blog Server app listening on port ${port}`);
});
