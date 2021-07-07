
require('dotenv').config()

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router");

//cors
app.use(cors());
app.use(express.json());
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(router)

module.exports = app;
