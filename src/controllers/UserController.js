const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserService = require("../models/UserService");

class UserController {

	async create(req, res) {
		try {
			const result = await UserService.create(req.body);
			if(!result.status){
				return res.status(400).json( {mensagem: result.mensagem});
			} else {
				const token = jwt.sign({id: result.user.id}, process.env.SECRET, {expiresIn: 1800});
				return res.status(201).json({
					id: result.user.id,
					data_criacao: result.user.data_criacao.toLocaleString(),
					data_atualizacao: result.user.data_atualizacao.toLocaleString(),
					ultimo_login: result.user.ultimo_login.toLocaleString(),
					token: token
				});
			}
		} catch(err) {
			console.log(err);
			res.status(500).json({mensagem: err});
		}
	}

	async findAll(req, res) {
		try{
			const users = await UserService.findAll();
			res.status(200).json(users);
		} catch(err) {
			res.json({mensagem: err});
		}
	}

	async login (req, res) {
		try{
			const user = await UserService.findByEmail(req.body.email);
			if(!user){
				return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"}); 
			}
			if(await bcrypt.compare(req.body.senha, user.senha)){
				const token = jwt.sign({id: user.id}, process.env.SECRET, {expiresIn: 1800});
				const ultimo_login = user.ultimo_login;
				UserService.updateLastLogin(user.id);
				return res.status(200).json({
					id: user.id,
					data_criacao: user.data_criacao.toLocaleString(),
					data_atualizacao: user.data_atualizacao.toLocaleString(),
					ultimo_login: ultimo_login.toLocaleString(),
					token: token
				});
			}
			return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
		} catch(err) {
			res.status(500).json({mensagem: err});
		}
	}

	async findUser(req, res) {
		try{
			const user = await UserService.findById(req.params.id);

			if(user == undefined){
				return res.status(404).json({mensagem: "Usuário não encontrado"});
			}

			res.status(202).json({
				nome: user.nome,
				email: user.email,
				data_criacao: user.data_criacao.toLocaleString(),
				data_atualizacao: user.data_atualizacao.toLocaleString(),
				ultimo_login: user.ultimo_login.toLocaleString(),
				telefones: user.telefones
			});
		} catch(err) {
			res.status(500).json({mensagem: err});
		}
	}

	async update(req, res) {
		try {
			const {nome, email} = req.body;
			const result = await UserService.update(req.params.id, nome, email);
			if(result.status){
				return res.status(200).json();
			} else {
				return res.status(404).json({mensagem: result.mensagem});
			}
		} catch(err) {
			res.status(500).json({mensagem: err});
		}
	}

	async delete(req, res) {
		try{
			const result = await UserService.delete(req.params.id);
			
			if(result.status)
				return res.status(200).json();

			return res.status(404).json({mensagem: result.mensagem});
		}
		catch(err) {
			res.status(500).json({mensagem: err});
		}
	}

}

module.exports = new UserController();