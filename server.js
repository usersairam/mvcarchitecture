const connection = require('./connectiondb')

const employee = require('./models/table_define')

const project = require('./models/projects')

const router = require('./routing')

const express = require('express')

const app = express()

app.use(express.json())

connection.sync().then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})
app.listen(3000,()=>{
    console.log("server is running at http://localhost:3000/")
})
app.use(router)