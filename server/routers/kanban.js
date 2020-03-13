const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const kanbanController = require('../controllers/kanban')


router.get('',kanbanController.getAll)
router.get('/:id',authorization,kanbanController.getOne)
router.post('',kanbanController.addKanban)
router.delete('/:id',authorization,kanbanController.deleteKanban)
router.put('/:id', authorization,kanbanController.updateKanban)

module.exports=router