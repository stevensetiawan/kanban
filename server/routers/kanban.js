const router = require('express').Router()
const authorization = require('../middlewares/authorization')
const kanbanController = require('../controllers/kanban')
const authentication = require('../middlewares/authentication')


router.use(authentication)
router.get('',kanbanController.getAll)
router.get('/:id',authorization,kanbanController.getOne)
router.post('',kanbanController.addKanban)
router.delete('/:id',authorization,kanbanController.deleteKanban)
router.put('/:id', authorization,kanbanController.updateKanban)

module.exports=router