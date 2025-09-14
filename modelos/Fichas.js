import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const ficha = sequelize.define("Ficha", {
    nome: {type: DataTypes.STRING, allowNull: false},
    classe: {type: DataTypes.STRING, allowNull: false},
    nivel: {type: DataTypes.INTEGER, defaultValue: 1},
    raca: {type: DataTypes.STRING, allowNull: false},
    antecedente: {type: DataTypes.STRING},
    pontosExperiencia: {type: DataTypes.INTEGER, defaultValue: 0},

    //Atributos principais
    forca:{type: DataTypes.INTEGER, defaultValue: 10},
    destreza: {type: DataTypes.INTEGER, defaulyValue: 10},
    constituicao: {type: DataTypes.INTEGER, defaultValue: 10},
    inteligencia: {type: DataTypes.INTEGER, defaultValue: 10},
    sabedoria: {type: DataTypes.INTEGER, defaultValue: 10},
    carisma: {type: DataTypes.INTEGER, defaultValue: 10},

    //Testes de resistencia
    resistenciaForca: {type: DataTypes.BOOLEAN, defaultValue: false},
    resistenciaDestreza: {type: DataTypes.BOOLEAN, defaultValue: false},
    resistenciaConstituicao: {type: DataTypes.BOOLEAN, defaultValue: false},
    resistenciaInteligencia:  {type: DataTypes.BOOLEAN, defaultValue: false},
    resistenciaSabedoria: {type: DataTypes.BOOLEAN, defaultValue: false},
    resistenciaCarisma: {type: DataTypes.BOOLEAN, defaultValue: false},

    //Outros detalhes
    inspiracao: {type: DataTypes.BOOLEAN, defaultValue: false},
    proficienciaBonus: {type: DataTypes.INTEGER, defaultValue: 2},
    classeArmadura: {type: DataTypes.INTEGER, defaultValue: 10},
    iniciativa: {type: DataTypes.INTEGER, defaultValue: 0},
    deslocamento: {type: DataTypes.DOUBLE, defaultValue: 9.0},

    //Historia do personagem
    historia: {type: DataTypes.TEXT},
    habilidades: {type: DataTypes.TEXT},
    tesouros: {type: DataTypes.TEXT},

    usuarioId: {type: DataTypes.INTEGER, allowNull: false}
});

export default ficha;