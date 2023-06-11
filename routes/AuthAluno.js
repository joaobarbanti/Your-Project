const express = require("express");

const route = express.Router();

const Controllers = require("../Controllers/AuthAluno");

const multer = require("multer");

 const upload = multer({ dest: "alunosfotos/" }); 

route.post("/registro", upload.single("foto"), Controllers.RegisterAluno);
route.post("/login", Controllers.LoginAluno);
route.post("/deslogar", Controllers.LogoutAluno);

module.exports = route;
