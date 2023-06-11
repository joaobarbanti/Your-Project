const express = require("express");
const route = express.Router();
const Controllers = require("../Controllers/ProfileAluno");

const multer = require("multer");

 const upload = multer({ dest: "alunosfotos/" }); 

route.get("/", Controllers.GetProfileInformation);
route.put(
  "/atualizar",
  upload.single("foto"),
  Controllers.UpdateProfileInformation
);
route.get("/projetos", Controllers.GetSubscribeProjectsInProfile);

module.exports = route;
