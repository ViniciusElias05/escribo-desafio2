"use strict";

var jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports = function (req, res, next) {
  var authToken = req.headers["authorization"];
  if (authToken != undefined) {
    var token = authToken.split(" ")[1];
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({
            mensagem: "Sessão Inválida"
          });
        }
        return res.status(401).json({
          mensagem: "Não autorizado"
        });
      }
      if (!(req.params.id == decoded.id)) {
        return res.status(401).json({
          mensagem: "Não permitido para sua autenticação"
        });
      }
      return next();
    });
  } else {
    return res.status(401).json({
      mensagem: "Não aut"
    });
  }
};