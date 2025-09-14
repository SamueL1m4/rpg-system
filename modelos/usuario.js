import {DataTypes} from "sequelize";
import sequelize from "../db.js";

const usuario = sequelize.define("Usuario", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    passwordHash: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.ENUM("player", "master"), defaultValue: "player"}
});

export default usuario;