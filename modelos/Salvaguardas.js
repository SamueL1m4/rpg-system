import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Ficha from "./Fichas.js";

const Salvaguarda = sequelize.define("Salvaguardas",{
    atributo: {type: DataTypes.STRING, allowNull: false},
    proficiente: {type: DataTypes.BOOLEAN, defaultValue: false},
    bonus: {type: DataTypes.INTEGER}
});

Salvaguarda.belongsTo(Ficha, {foreignKey: "fichaId"});
Ficha.hasMany(Salvaguarda, {foreignKey: "fichaId"});

export default Salvaguarda;