const connection = require("../db/connection");
const bcrypt = require("bcrypt");

class UserService {

	async findAll() {
		try {
			var users = await connection.select("*").table("users");
			return users;
		} catch (err) {
			return { mensagem: err };
		}
	}

	async create(user) {
		try {
			if (await this.findByEmail(user.email)) {
				return { status: false, mensagem: "E-mail já existente" };
			} else {
				var hash = await bcrypt.hash(user.senha, 10);
				const id = await connection
					.insert({
						nome: user.nome, email: user.email, senha: hash,
						ultimo_login: new Date(), data_criacao: new Date(), data_atualizacao: new Date()
					})
					.table("users");
				await this.createTelefone(user.telefones, id);
				const userResult = await this.findById(id[0]);
				return { status: true, user: userResult };
			}
		} catch (err) {
			console.log(err);
			return { status: false, error: err };
		}
	}

	async createTelefone(telefones, id) {
		for (let i = 0; i < telefones.length; i++) {
			try {
				await connection.insert({ ddd: telefones[i].ddd, numero: telefones[i].numero, user_id: id }).table("telefones");
			} catch (err) {
				return { status: false, error: err };
			}
		}
	}

	async findByEmail(email) {
		try {
			var user = await connection.select("*").where({ email: email }).table("users");
			if (user.length > 0) {
				return user[0];
			}
			return false;
		} catch (err) {
			return false;
		}
	}

	async findById(id) {
		try {
			const user = await connection.select("*").where({ id: id }).table("users");
			if (user.length > 0) {
				user[0].telefones = await this.findPhonesOfUser(id);
				return user[0];
			}
			return undefined;
		} catch (err) {
			return undefined;
		}
	}

	async updateLastLogin(id) {
		try {
			await connection.update({ ultimo_login: new Date() }).where({ id: id }).table("users");
			await connection.update({ data_atualizacao: new Date() }).where({ id: id }).table("users");
			return { status: true };
		} catch {
			return;
		}
	}

	async findPhonesOfUser(id) {
		try {
			const result = await connection.select(["ddd", "numero"]).where({ user_id: id }).table("telefones");
			return result;
		} catch {
			return [];
		}
	}

	async update(id, nome, email) {
		const user = await this.findById(id);
		if (user != undefined) {

			var editUser = {};

			if (email != undefined) {
				if (email != user.email) {
					const result = await this.findByEmail(email);
					if (result == false) {
						editUser.email = email;
					} else {
						return { status: false, mensagem: "O e-mail já está cadastrado!" };
					}
				}
			}
			
			if (nome != undefined) {
				editUser.nome = nome;
			}
			
			editUser.data_atualizacao = new Date();
			
			try {
				await connection.update(editUser).where({ id: id }).table("users");
				return { status: true};
			} catch (err) {
				return { status: false, mensagem: err };
			}
		} else {
			return { status: false, mensagem: "O usuário não existe" };
		}
	}

	async delete(id) {
		const user = await this.findById(id);
		if(user != undefined){
			try{
				await connection.delete().where({id: id}).table("users");
				await connection.delete().where({user_id: id}).table("telefones");
				return({status: true});
			} catch(err) {
				return {status: false, mensagem: err};
			}
		}
		return {status: false, mensagem: "O usuário não existe!"};
	}
}

module.exports = new UserService();