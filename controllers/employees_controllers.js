const express = require('express')
const { add } = require('lodash')
const connection = require('../connectiondb')

const {createUserValidation,updateUserValidation} = require('../joiValidations')

const employee = require('../models/table_define')

const project = require('../models/projects')

const app = express()

app.use(express.json())

const hasFirstNameandLastNameandIdandAddress = (obj)=>{
    const {first_name,last_name,id,address} = obj 
    return first_name!==undefined&&last_name!==undefined&&id!==undefined&&address!==undefined
}
const hasFirstNameandLastNameandId = (obj)=>{
    const {first_name,last_name,id} = obj
    return first_name!==undefined&&last_name!==undefined&&id!==undefined
}
const hasFirstNameandLastName = (obj)=>{
    const {first_name,last_name} = obj
    return first_name!==undefined&&last_name!==undefined
}
const hasFirstNameandNo = (obj)=>{
    const {first_name,mobile_no} =obj
    return first_name!==undefined&&mobile_no!==undefined
}
employee.hasMany(project,{foreignKey:"project_members"})
project.belongsTo(employee)

const searchItem = (obj)=>{
    const {mobile_no,first_name,last_name,address} = obj
    let searchQuery;
    switch (true){
        case mobile_no!==undefined:
            searchQuery = mobile_no
            break
        case first_name!==undefined:
            searchQuery=first_name
            break
        case last_name!==undefined:
            searchQuery=last_name
            break
        case address !==undefined:
            searchQuery = address
            break
    }
    return searchQuery
}

const routes = {
    allUser : async(req,res)=>{
        const employees = await employee.findAll()
        res.send(employees)
    },
    getUser : async (req,res)=>{
        
        const search_result = searchItem(req.query)
        const search_q = Object.keys(req.query)[0]
        const find_query = `select * from employees where ${search_q} like '%${search_result}%';`;
        const worker = await connection.query(find_query)
        res.send(worker)
    },
    postUser : async (req,res)=>{
        try{
        const {first_name,last_name,mobile_no,email,address} = await createUserValidation.validateAsync(req.body)
        await employee.create({first_name:first_name,last_name:last_name,mobile_no:mobile_no,email:email,address:address})
        const workers = await employee.findAll()
        res.send(workers)
        }
        catch(err){
            res.send(err.message)
        }
    },
    updateUser : async (req,res)=>{
        const {id} = req.params
        const {first_name,last_name,mobile_no,email,address} = await updateUserValidation.validateAsync(req.body)
        const updatingEmployee = await employee.update({
            first_name:first_name,last_name:last_name,mobile_no:mobile_no,email:email,address:address
        },{where:{id:id}})
        res.send("Success")
    },
    removeUser : async (req,res)=>{
        const {id} = req.params
        await employee.destroy({where:{id:id}})
        res.send("Deleted")
    },
    getProjectMembers : async (req,res)=>{
        let users = await employee.findAll({
            include:[{
                model:project,
                required:true,
                attributes:["project_name"]
            }],
            attributes:["id","first_name","last_name"]
        })
        res.send(users)
    },
    getProject : async (req,res)=>{
        let users = await employee.findAll({
            include:[{
                model:project,
                required:true,
                attributes:["project_name"]
            }],
            attributes:["id","first_name","last_name"],where:{id:req.params.id}
        })
        res.send(users)
    }
}
module.exports = routes