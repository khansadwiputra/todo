const { Op } = require('sequelize')
const {Tasks} = require('../models/index')

class Controller {
    static showAllTasks(req, res){
        let status = req.query.status
        // console.log(status, '<<<<<<<');
        let condition = {}
        if(status){
           condition.where = {status: status}
        }

        Tasks.findAll(condition)
        .then((tasks) => {
            tasks = tasks.map((el => {
                return el.dataValues
            }))
            res.render('home', {tasks})
        })
        .catch((error) => {
            res.send(error)
        })
    }
    
    static addTasks(req, res){
        res.render('showForm')
    }
    static saveTasks(req, res){
        let tasks = {
            content: req.body.content,
            status: req.body.status
        }
        
        // res.send(tasks)
        Tasks.create(tasks)
        .then((newTasks) => {
            res.redirect('/')
        })
        .catch((error) => {
            res.send(error)
        })
    }

    static updateToComplete(req, res){
        let id = req.params.id
        Tasks.update({status: 'complete'}, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        .then((updateComplete) => {
            console.log(updateComplete);
            res.redirect('/')
        })
        .catch((error) => {
            res.send(error)
        })
    }

    static updateToUncomplete(req, res){
        let id = req.params.id
        Tasks.update({status: 'uncomplete'}, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        .then((updateComplete) => {
            console.log(updateComplete);
            res.redirect('/')
        })
        .catch((error) => {
            res.send(error)
        })
    }

    static delete(req, res){
        let id = req.params.id
        Tasks.destroy({
            where:{
                id: {
                    [Op.eq]: id
                }
        }})
        .then((result) => {
            res.redirect('/')
        })
        .catch((error) => {
            res.send(error)
        })
        
    }

}

module.exports = Controller