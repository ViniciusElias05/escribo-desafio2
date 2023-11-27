const express = require("express");
const UserController = require("./controllers/UserController");
const Auth = require("./middlewares/Auth");
const app = express();

app.use(express.json());

app.get("/", UserController.findAll);

app.post("/users/create", UserController.create);

app.post("/users/login", UserController.login);

app.get("/users/:id", Auth, UserController.findUser);

app.put("/users/:id", Auth, UserController.update);

app.delete("/users/:id", Auth, UserController.delete);

module.exports = app;