import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Ficha from "./Fichas.js";

const Magia = sequelize.define("Magias",{
    nome: {type: DataTypes.STRING, allowNull: false},
    nivel: {type: DataTypes.INTEGER},
    escola: {type: DataTypes.STRING},
    tempo: {type: DataTypes.STRING},
    alcance: {type: DataTypes.STRING},
    componentes: {type: DataTypes.STRING},
    duracao: {type: DataTypes.STRING},
    descricao: {type: DataTypes.TEXT}
});

Magia.belongsTo(Ficha, {foreignKey: "fichaId"});
Ficha.hasMany(Magia, {foreignKey: "fichaId"});

export default Magia;