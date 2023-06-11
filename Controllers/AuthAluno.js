const db = require("../db/mysql");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RegisterAluno = async () => {
  const { RA } = req.body.RA;

  const q = "SELECT * FROM alunos WHERE RA = ?";

  const file = req.file;

  db.query(q, [RA], async (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (result.length > 0) {
      return res.status(400).json({
        message: "RA de Aluno já Registrado, faça login para continuar",
      });
    }

    const salt = await bcryptjs.genSalt();
    const hashpassword = await bcryptjs.hash(req.body.senha, salt);

    const q =
      "INSERT INTO alunos (`nome`, `sobrenome`, `sala`, `sexo`, `RA`, `contato`, `senha`, `foto`) VALUES(?)";

    const values = [
      req.body.nome,
      req.body.sobrenome,
      req.body.sala,
      req.body.sexo,
      req.body.RA,
      req.body.contato,
      hashpassword,
      file.path,
    ];

    db.query(q, [values], (err) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json({ message: "Aluno Registrado com Sucesso" });
    });
  });

  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const LoginAluno = (req, res) => {
  const q = "SELECT * FROM alunos WHERE RA = ?";

  db.query(q, [req.body.RA], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    if (!result) {
      return res
        .status(500)
        .json({
          message: "RA não Encontrado no Sistema, Faça Registro para Continuar",
        });
    }

    const comparesenha = bcryptjs.compare(req.body.senha, result[0].senha);

    if (!comparesenha) {
      return res.status(500).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { alunoid: result[0].id, RA: result[0].RA },
      process.env.TOKEN
    );

    const { senha, ...other } = result[0];

    res
      .cookie("Acess_Token", token, {
        secure: true,
      })
      .status(200)
      .json(other);
  });
};

const LogoutAluno = (req, res) => {
  try {
    res
      .clearCookie("Acess_Token", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json({ message: "Deslogado com Sucesso" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.RegisterAluno = RegisterAluno;
exports.LoginAluno = LoginAluno;
exports.LogoutAluno = LogoutAluno;
