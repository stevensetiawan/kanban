const { Kanban, User } = require('../models')
module.exports = (req, res, err, next) => {
    const { id } = req.params;
    console.log(id, req.userData)
    Kanban.findByPk(id)
        .then(task => {
            if (task) {
                if(task.UserId==req.userData.data.id){
                    User.findByPk(req.userData.data.id)
                    .then(user=>{
                        if(user){
                            next()
                        }
                        else{
                            res.status(404).json({message: "User not found"})
                        }
                    })
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