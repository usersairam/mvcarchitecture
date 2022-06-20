const Sequelize = require('sequelize');

const connection = require('../connectiondb')

const project = connection.define("project",{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull : false,
        primaryKey : true
    },
    project_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    project_members:{
        type:Sequelize.INTEGER,
        foreignKey:true,
        allowNull:false
    }
});
module.exports = project 