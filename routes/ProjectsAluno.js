const express = require("express");
const route = express.Router();
const Controllers = require("../Controllers/ProjectsAluno");
const multer = require("multer");

const upload = multer({ dest: "projetosarquivos/" }); 

route.post("/publicar", upload.single("video"), Controllers.PostProject);
route.get("/", Controllers.GetAllProjects);
route.get("/projeto/:id", Controllers.GetProjectInformation);
route.get("/projeto/inscritos/:id", Controllers.GetSubscribersInformation);
route.delete("/deletar/:id", Controllers.DeleteProject);
route.put("/atualizar/:id", upload.single("video"), Controllers.UpdateProject);
route.post("/inscrever/:id", Controllers.SubscribeProject);
route.delete("/desinscrever/:id", Controllers.UnsubscribeProject);

module.exports = route;
