    const jwt = require('../helpers/jwt')
    const { User } = require('../models')
    
    module.exports=(req,res,next)=>{
        
        let { token } = req.headers
            try{
                req.userData = jwt.jwtVerify(token)
                // console.log(req.userData)
                next()
            } catch(err){
                next(err)
            }
        }
    // module.exports = (req, res, err, next) => {
    //     const token = req.headers.token
    //     console.log(token)
    //     let dataUser = jwt.jwtVerify(token)
    //     console.log(dataUser)
    //     let id = {
    //         where:
    //         {
    //             id: dataUser.id
    //         }
    //     }
    //     User.findOne(id)
    //     .then(data=>{
    //         if(data){
    //             console.log(data)
    //             req.userData = data.id
    //             console.log(req.userData)
    //             next()
    //         } else {
                
    //         }
    //     }).catch(err =>{
    //         res.status(400).json(err)
    //     })

    // }