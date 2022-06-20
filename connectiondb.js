const Sequelize = require("sequelize");

const connection = new Sequelize("industry","root","Root@123",{
    dialect: "mysql",
    host: "localhost"
})

module.exports = connection