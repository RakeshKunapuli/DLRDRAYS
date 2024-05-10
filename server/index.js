const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
const userroutes = require("./Routes/user.routes");
const cors = require("cors")

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello from server");
});

app.use("/users", userroutes);
app.use('/uploads', express.static('uploads'));

const port = process.env.PORT || 8002;
mongoose
    .connect(process.env.URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`The server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Unable to connect to server", err);
    });
