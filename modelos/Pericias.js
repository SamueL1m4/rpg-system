import {DataTypes} from "sequelize";
import sequelize from "../db.js";
import Ficha from "./Fichas.js";

const Pericias = sequelize.define("Pericias",{
    nome: {type: DataTypes.STRING, allowNull: false},
    atributo: {type: DataTypes.STRING},
    proficiente: {type: DataTypes.BOOLEAN, defaultValue: false},
    bonus: {type: DataTypes.INTEGER},
    notas: {type: DataTypes.TEXT}
});

Pericias.belongsTo(Ficha, {foreignKey: "fichaId"});
Ficha.hasMany(Pericias, {foreignKey: "fichaId"});

export default Pericias;