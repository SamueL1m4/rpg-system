import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usuario from "../modelos/usuario.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    const existing = await usuario.findOne({where: {email } });
    if(existing) return res.status(400).json({error: "Email já cadastrado"});

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await usuario.create({name, email, passwordHash });

    res.json({ message: "Usuário criado com sucesso!", id: user.id});
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await usuario.findOne({ where: { email } });
  if (!user) return res.status(400).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(400).json({ error: "Senha incorreta" });

  const JWT_SECRET = process.env.JWT_SECRET || "segredoSuperSecreto";
  const token = jwt.sign({ 
    id: user.id, role: user.role },
     JWT_SECRET, { 
        expiresIn: "1h" 
    });
    console.log("Login - JWT_SECRET usado:", JWT_SECRET);
    console.log("Token gerado:", token);

  res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
});

export default router;