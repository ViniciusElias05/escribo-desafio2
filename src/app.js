const express = require("express");
const UserController = require("./controllers/UserController");
const Auth = require("./middlewares/Auth");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		links: {
			criarUsuario:{
				href: "https://api-rest-ed.onrender.com/users/create",	
				type: "POST"
			},
			fazerLogin: {
				href: "https://api-rest-ed.onrender.com/users/login",
				type: "POST"
			},
			buscarUsuario: {
				href: "https://api-rest-ed.onrender.com/users/:id",
				type: "GET"
			},
			deletarUsuario:{
				href: "https://api-rest-ed.onrender.com/users/:id",
				type: "DELETE"
			} ,
			atualizarUsuario:{
				href: "https://api-rest-ed.onrender.com/users/:id",
				type: "PUT"
			} 
		}
	});
});

app.post("/users/create", UserController.create);

app.post("/users/login", UserController.login);

app.get("/users/:id", Auth, UserController.findUser);

app.put("/users/:id", Auth, UserController.update);

app.delete("/users/:id", Auth, UserController.delete);

module.exports = app;