    const jwt = require('../helpers/jwt')
    const { User } = require('../models')
    
    // module.exports=(req,res,next)=>{
        
        // let { token } = req.headers
        //     try{
        //         req.userData = jwt.jwtVerify(token)
        //         // console.log(req.userData)
        //         next()
        //     } catch(err){
        //         next(err)
        //     }
        // }
    module.exports = (req, res, next) => {
        let { token } = req.headers
        console.log("ini token:",token)
        let dataUser = jwt.jwtVerify(token)
        console.log("Datauser:",dataUser)
        let id = {
            where:
            {
                id: dataUser.data.id
            }
        }
        User.findOne(id)
        .then(user=>{
            if(user){
                console.log("masuk user",user.dataValues)
                req.userData = user.dataValues
                console.log("masuk authentication:",req.userData)
                next()
            } else {
                
            }
        }).catch(err =>{
            res.status(400).json(err)
        })

    }