const db = require("../db/mysql");
const jwt = require("jsonwebtoken");

const PostProject = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;
    const file = req.file;

    if (!token)
      return res.status(400).json({
        message:
          "Você não tem acesso a essa página, faça login para continuar!",
      });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Token inválido, Faça Login Novamente" });
      }
      const q =
        "INSERT INTO projetos (`alunoid`, `nomeprojeto`, `descricao`, `video`, `nicho`,`inscricoes`, `fiminscricoes`) VALUES(?)";

      const values = [
        result.alunoid,
        req.body.nomeprojeto,
        req.body.descricao,
        file.path,
        req.body.nicho,
        req.body.inscricoes,
        req.body.fiminscricoes,
      ];

      db.query(q, [values], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Projeto Publicado com Sucesso" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const GetAllProjects = (req, res) => {
  try {
    const q = req.query.nicho
      ? "SELECT * FROM projetos WHERE nicho = ?"
      : "SELECT * FROM projetos";

    db.query(q, [req.query.nicho], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const DeleteProject = (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    const deleteproject = req.params.id;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login para Executar essa Ação" });
    }

    jwt.verify(cookie, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, Faça Login Novamente" });

      const q =
        "DELETE from projetos WHERE projetos.alunoid=? AND projetos.id=?";

      db.query(q, [result.alunoid, deleteproject], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Projeto Deletado com Sucesso" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const UpdateProject = (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    const updateproject = req.params.id;

    const file = req.file;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login Para Executar essa Ação" });
    }

    jwt.verify(cookie, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido, Faça Login Novamente" });

      const q =
        "UPDATE projetos SET `nomeprojeto` = ?, `descricao` = ?, `video` = ?, `nicho` = ?,`inscricoes` = ?, `fiminscricoes` = ? WHERE projetos.alunoid = ? AND projetos.id = ?";

      const values = [
        req.body.nomeprojeto,
        req.body.descricao,
        file.path,
        req.body.nicho,
        req.body.inscricoes,
        req.body.fiminscricoes,
      ];

      db.query(q, [...values, result.alunoid, updateproject], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Projeto Atualizado com Sucesso" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const SubscribeProject = (req, res) => {
  try {
    const token = req.cookies.Acess_Token;

    if (!token)
      return res.status(400).json({
        message:
          "Você não tem acesso a essa página, faça login para continuar!",
      });

    jwt.verify(token, process.env.TOKEN, (err, result) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Token inválido, Faça Login Novamente" });
      }
      const q =
        "INSERT INTO inscritosprojetos (`alunoid`, `projetoid`) VALUES(?)";

      const values = [result.alunoid, req.params.id];

      db.query(q, [values], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Inscrito com Sucesso no Projeto!" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const UnsubscribeProject = (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    const unsubscribeproject = req.params.id;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login Para Executar essa Ação" });
    }

    jwt.verify(cookie, process.env.TOKEN, (err, result) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido Faça Login Novamente" });

      const q =
        "DELETE FROM inscritosprojetos WHERE inscritosprojetos.alunoid = ? AND inscritosprojetos.projetoid = ?";

      db.query(q, [result.alunoid, unsubscribeproject], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Você se Desinscreveu do Projeto" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetProjectInformation = (req, res) => {
  try {
    const project = req.params.id;

    const q =
      "SELECT nome, sobrenome, sala, foto, nomeprojeto, descricao, video, nicho, inscricoes, fiminscricoes FROM alunos JOIN projetos ON alunos.id = projetos.alunoid WHERE projetos.id = ?";

    db.query(q, [project], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetSubscribersInformation = (req, res) => {
  try {
    const project = req.params.id;

    const q =
      "SELECT nome, sobrenome, sala, foto FROM alunos JOIN inscritosprojetos ON alunos.id = inscritosprojetos.alunoid WHERE inscritosprojetos.projetoid = ?";

    db.query(q, [project], (err, result) => {
      if (err) return res.status(500).json({ message: err.message });

      res.status(200).json(result);
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.PostProject = PostProject;
exports.GetAllProjects = GetAllProjects;
exports.DeleteProject = DeleteProject;
exports.UpdateProject = UpdateProject;
exports.SubscribeProject = SubscribeProject;
exports.UnsubscribeProject = UnsubscribeProject;
exports.GetProjectInformation = GetProjectInformation;
exports.GetSubscribersInformation = GetSubscribersInformation;
