require("dotenv").config();

const connection = require("knex")({
	client: "mysql2",
	connection: process.env.DATABASE_URL,
	useNullAsDefault: true
});

module.exports = connection;