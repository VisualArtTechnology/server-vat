
require('dotenv').config
const express = require("express");
const app = express();
const cors = require("cors");
const router = require('./routes');
const port = 3000;
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use("/", router);

app.listen(port, () => {
  console.log(`example listening ${port}`);
});
