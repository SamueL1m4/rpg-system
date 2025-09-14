import {DataTypes} from "sequelize";
import sequelize from "../db.js";
import Ficha from "./Fichas.js";

const Arma = sequelize.define("Armas", {
    nome: {type: DataTypes.STRING, allowNull: false},
    tipo: {type: DataTypes.STRING},
    bonus: {type: DataTypes.INTEGER},
    dano: {type: DataTypes.STRING},
    notas: {type: DataTypes.TEXT},
});

Arma.belongsTo(Ficha, {foreignKey: "fichaId"});
Ficha.hasMany(Arma, {foreignKey: "fichaId"});

export default Arma;