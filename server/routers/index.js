const router = require('express').Router()
const userRouter = require('./user')
const kanbanRouter = require('./kanban')

router.use('/user',userRouter)
router.use('/kanban',kanbanRouter)

module.exports=router