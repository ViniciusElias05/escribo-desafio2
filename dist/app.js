"use strict";

var express = require("express");
var UserController = require("./controllers/UserController");
var Auth = require("./middlewares/Auth");
var app = express();
app.use(express.json());
app.get("/", UserController.findAll);
app.post("/users/create", UserController.create);
app.post("/users/login", UserController.login);
app.get("/users/:id", Auth, UserController.findUser);
app.put("/users/:id", Auth, UserController.update);
app["delete"]("/users/:id", Auth, UserController["delete"]);
module.exports = app;