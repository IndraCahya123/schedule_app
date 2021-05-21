const express = require('express');
const router = require("./src/routes");
const cors = require('cors');

require('dotenv').config();

const app = express();

const portServer = process.env.PORT || 8000;

app.use(express.json());

app.use(cors());

app.use("/api/v1", router);

app.get("/", (req, res) => {
    res.send(`Your Server Running at port ${portServer}`)
});

app.use("/images", express.static("images"));

app.listen(portServer, () => console.log(`your server is running at port : ${portServer}`));