/* eslint-disable no-undef */
const request = require("supertest");
const app = require("../app");

let userId, userToken;

describe("Test user creation", () => {
	it("User created successfully", async () => {
		const res = await request(app).post("/users/create")
			.send({
				"nome": "teste",
				"email": "teste@hotmail.com",
				"senha": "123456",
				"telefones": [{ "ddd": "11", "numero": "995674356" }, { "ddd": "11", "numero": "976543210" }]
			});
		userId = res.body.id;
		userToken = res.body.token;
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("id", "data_criacao", "data_atualizacao", "ultimo_login", "token");
	});

	it("User creation failed, because email already exists", async () => {
		const res = await request(app).post("/users/create")
			.send({
				"nome": "teste",
				"email": "teste@hotmail.com",
				"senha": "123456",
				"telefones": [{ "ddd": "11", "numero": "995674356" }, { "ddd": "11", "numero": "976543210" }]
			});
		expect(res.statusCode).toEqual(400);
		expect(res.body.mensagem).toEqual("E-mail já existente");
	});

});



describe("Test user login ", ()=>{
	it("Login executed successfully", async () => {
		const res = await request(app).post("/users/login")
			.send({
				"email": "teste@hotmail.com",
				"senha": "123456"
			});
		userToken = res.body.token;
		expect(res.statusCode).toEqual(200);
		expect(res.body).toHaveProperty("id", "data_criacao", "data_atualizacao", "ultimo_login", "token");
	});

	it("Login failed because email doesn't exists", async () => {
		const res = await request(app).post("/users/login")
			.send({
				"email": "teste1@hotmail.com",
				"senha": "123456"
			});
		expect(res.statusCode).toEqual(401);
		expect(res.body.mensagem).toEqual("Usuário e/ou senha inválidos");
	});

	it("Login failed because password is incorrect", async () => {
		const res = await request(app).post("/users/login")
			.send({
				"email": "teste@hotmail.com",
				"senha": "1234567"
			});
		expect(res.statusCode).toEqual(401);
		expect(res.body.mensagem).toEqual("Usuário e/ou senha inválidos");
	});
});



describe("Test search for user", ()=> {
	it("Must search user by id", async () => {
		const res = await request(app).get("/users/" + userId)
			.set("Authorization", "Bearer " + userToken);
		expect(res.statusCode).toEqual(202);
		expect(res.body).toHaveProperty("nome", "email", "data_criacao", "data_atualizacao", "ultimo_login", "telefones");
	});

	it("Authentication failed", async () => {
		const res = await request(app).get("/users/" + userId)
			.set("Authorization", "Bearer " + "vmkamk2mckdom3");
		expect(res.statusCode).toEqual(401);
		expect(res.body.mensagem).toEqual("Não autorizado");
	});
});



describe("Test delete user", ()=>{
	it("user deleted successfully", async () =>{
		const res = await request(app).del("/users/" + userId)
			.set("Authorization", "Bearer " + userToken);
		expect(res.statusCode).toEqual(200);
	});
});
