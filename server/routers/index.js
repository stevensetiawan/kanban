const router = require('express').Router()
const userRouter = require('./user')
const kanbanRouter = require('./kanban')
const authentication = require('../middlewares/authentication')

router.use('/user',userRouter)
router.use('/kanban',authentication,kanbanRouter)

module.exports=router