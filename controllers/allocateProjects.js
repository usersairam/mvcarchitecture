const express = require('express')
const { add } = require('lodash')
const connection = require('../connectiondb')

const {createUserValidation,updateUserValidation} = require('../joiValidations')

const project = require('../models/projects')

const app = express()

app.use(express.json())

const allocateProjects = {
    allocateProject:async (req,res)=>{
        const {project_name,project_members} = req.body
        const allocateUser = await project.create({project_name:project_name,project_members:project_members})
        res.send(allocateUser)
    },
    getAllProjects : async (req,res)=>{
        res.send(await project.findAll())
    }
}
module.exports = allocateProjects