"use strict";

var app = require("./app");
require("dotenv").config();
var port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log("Rodando...");
});