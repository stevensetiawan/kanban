const { Kanban } = require('../models')

class kanbanController {
    static addKanban(req, res) {
        console.log(req.userData)
        let input = {
            title: req.body.title,
            description: req.body.description,
            UserId: req.userData.id,
            status:"backlog"
        }

        Kanban.create(input)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json(err)
            })

    }
    // add end/

    static deleteKanban(req, res) {
        let id = {
            where: {
                id: req.params.id
            }
        }

        Kanban.destroy(id)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json(err)
            })
    }
    //delete end/

    static updateKanban(req, res) {
        const {id} = req.params;
       const { title, description, status} = req.body;

        let input = {
            title: title,
            description: description,
            UserId: req.userData.id,
            status: status
        }

        Kanban.findByPk(id)
            .then(data => {
                return Kanban.update(input, {where: {id}})
            }).then(data => {
                res.status(200).json(data)
            }).catch(err => {
                console.log(err)
                res.status(400).json(err)
            })

    }
    //update end/

    static getAll(req, res) {
        console.log("masuk getall:", req.userData)
        let id = {
            where: {
                UserId: req.userData.id
            },order: [
                ['id', 'DESC']
              ]
        }
        Kanban.findAll(id)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json({ msg: err.message })
            })
    }
    // get all end/

    static getOne(req, res) {
        let id = {
            where: {
                id: req.params.id
            }
        }
        Kanban.findOne(id)
            .then(data => {
                res.status(200).json(data)
            }).catch(err => {
                res.status(400).json(err)
            })
    }
    // get one end/
}

module.exports = kanbanController