import express from "express";
import dotenv from "dotenv";
import sequelize from "./db.js";
import authRoutes from "./rotas/auth.js";
import usuario from "./modelos/usuario.js";
import ficha from "./modelos/Fichas.js";
import fichasRouter from "./rotas/ficha.js";
import armasRouter from "./rotas/armas.js";
import magiasRouter from "./rotas/magia.js";
import { autenticar } from "./middleware/auth.js";

dotenv.config();

sequelize.sync({ alter: true});
const app = express();
app.use(express.json());

//Rotas
app.use("/auth", authRoutes);
app.use("/ficha", autenticar, fichasRouter);
app.use("/armas", armasRouter);
app.use("/magia", magiasRouter);

//Sincroniza com MySQL e iniciar
sequelize.sync().then(() => {
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});

usuario.hasMany(ficha, {foreignKey: "usuarioId"});
ficha.belongsTo(usuario, {foreignKey: "usuarioId"});