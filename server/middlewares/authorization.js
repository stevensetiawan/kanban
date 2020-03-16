const { Kanban, User } = require('../models')
module.exports = (req, res, next) => {
    const { id } = req.params;
    console.log(id, req.userData)
    Kanban.findByPk(id)
        .then(task => {
            if (task) {
                if(task.UserId===req.userData.id){
                    next()
                } else {
                    res.status(403).json({message: "Unauthorized"})
                }
            } else {
                res.status(404).json({message:"data not found"})
            }
        }).catch(err => {
            res.status(500).json(err)
        })

}