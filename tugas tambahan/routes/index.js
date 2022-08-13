const Controller = require('../controllers/controller')
const routes = require('express').Router()

routes.get('/', Controller.showAllTasks)
routes.get('/add', Controller.addTasks)
routes.post('/add', Controller.saveTasks)
routes.get('/complete/:id', Controller.updateToComplete)
routes.get('/uncomplete/:id', Controller.updateToUncomplete)
routes.get('/delete/:id', Controller.delete)


module.exports = routes

