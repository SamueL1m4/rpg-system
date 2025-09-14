import { Sequelize } from "sequelize";

const sequelize = new Sequelize("rpgdb", "root", "123456789",{
    host: "localhost",
    dialect: "mysql",
    logging: false
});

export default sequelize;