const express = require('express')

const router = express.Router()

const allocateProjects = require('./controllers/allocateProjects');

const employees_controllers = require('./controllers/employees_controllers')

router.get('/allUsers',employees_controllers.allUser);
router.get('/getUser/',employees_controllers.getUser);
router.post('/addUser',employees_controllers.postUser);
router.put('/updateUser/:id',employees_controllers.updateUser);
router.delete('/removeUser/:id',employees_controllers.removeUser);
router.post('/postProjects',allocateProjects.allocateProject);
router.get('/getProjects',allocateProjects.getAllProjects);
router.get('/projectMembers',employees_controllers.getProjectMembers)
router.get('/project/:id',employees_controllers.getProject)

module.exports = router;