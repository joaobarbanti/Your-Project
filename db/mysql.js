const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "root",
  password: "Julia2404",
  database: "your-project",
  localAddress: "localhost",
});

connection.connect((err) => {
  if (err) throw err;

  return console.log("Banco de Dados Carregado com Sucesso");
});

module.exports = connection;
