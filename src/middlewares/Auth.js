const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    
	const authToken  = req.headers["authorization"];

	if(authToken != undefined) {
		const token = authToken.split(" ")[1];
		jwt.verify(token, process.env.SECRET, (err, decoded) =>{
			if(err) {
				if(err.name === "TokenExpiredError") {
					return res.status(401).json({mensagem: "Sessão Inválida"});
				} 
				return res.status(401).json({mensagem: "Não autorizado"});
			}

			if(!(req.params.id == decoded.id)){
				return res.status(401).json({mensagem: "Não permitido para sua autenticação"});
			}
			return next();
		});
	} else {
		return res.status(401).json({mensagem: "Não aut"});
	}
    
};