require('dotenv').config();
const express = require('express');
const app = express();

const router = require("./routes");

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.use(router);


app.listen(process.env.APPLICATION_PORT, () => {
    console.log("Server up and running", process.env.APPLICATION_PORT);
})

