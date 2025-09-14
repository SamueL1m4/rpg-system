import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "segredoSuperSecreto";

export function autenticar(req, res, next) {
  console.log("Middleware autenticar chamado", req.method, req.url);

  const authHeader = req.headers["authorization"] || req.headers["Authorization"];
  console.log("🔑 Header recebido:", authHeader);

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");
  console.log("🔍 Parts:", parts);

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token inválido (split errado)" });
  }

  const scheme = parts[0];
  const token = parts[1];

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token inválido (scheme errado)" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Decoded:", decoded);
    req.usuarioId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (err) {
    console.error("❌ Erro JWT:", err);
    return res.status(401).json({ 
      error: "Token inválido", 
      detalhes: err.message || JSON.stringify(err) 
    });
  }
}
