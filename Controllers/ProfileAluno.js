const db = require("../db/mysql");
const jwt = require("jsonwebtoken");

const GetProfileInformation = (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

    if (!cookie) {
      return res
        .status(404)
        .json({ message: "Faça Login Para Executar essa Ação" });
    }

    jwt.verify(cookie, process.env.TOKEN, (err, token) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Token inválido Faça Login Novamente" });

      const q =
        "SELECT nome, sobrenome, sala, sexo, RA, contato, foto FROM alunos WHERE alunos.id = ?";

      db.query(q, [token.alunoid], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(200).json(result);
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const UpdateProfileInformation = (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

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
        "UPDATE alunos SET `nome` = ?, `sobrenome` = ?, `sala` = ?, `sexo` = ?,`RA` = ?, `contato` = ?, `foto` = ? WHERE alunos.id = ? ";

      const values = [
        req.body.nome,
        req.body.sobrenome,
        req.body.sala,
        req.body.sexo,
        req.body.RA,
        req.body.contato,
        file.path,
      ];

      db.query(q, [...values, result.alunoid], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res
          .status(200)
          .json({ message: "Perfil Atualizado com Sucesso" });
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const GetSubscribeProjectsInProfile = (req, res) => {
  try {
    const cookie = req.cookies.Acess_Token;

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
        "SELECT nomeprojeto, descricao, video, nicho, inscricoes, fiminscricoes FROM alunos JOIN inscritosprojetos ON alunos.id = inscritosprojetos.alunoid JOIN projetos ON inscritosprojetos.projetoid = projetos.id WHERE alunos.id = ? ";

      db.query(q, [result.alunoid], (err, result) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(200).json(result);
      });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.GetProfileInformation = GetProfileInformation;
exports.UpdateProfileInformation = UpdateProfileInformation;
exports.GetSubscribeProjectsInProfile = GetSubscribeProjectsInProfile;
