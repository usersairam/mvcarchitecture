const Sequelize = require('sequelize');

const connection = require('../connectiondb')

const employee = connection.define("employee",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    first_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    last_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    mobile_no:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    address:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
module.exports = employee
