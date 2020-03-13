const { User } = require('../models')
const jwt = require('../helpers/jwt')
const bcrypt = require('../helpers/bcrypt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT);

class userController {

    static register(req,res){
        let input = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(input)
        .then(data=>{
            let token = jwt.jwtSign({
                id: data.id,
                email: data.email
            })
            res.status(200).json({token})
        }).catch(err=>{
            res.status(400).json(err)
        })
    }

    static login(req,res){
        let email = {
            where:{
                email: req.body.email
            }
        }

        let password = req.body.password

        User.findOne(email)
        .then(data=>{
            let validation = bcrypt.checker(password,data.password)
            if(validation){
                let token = jwt.jwtSign({
                    id: data.id,
                    email: data.email
                })
                
                res.status(200).json({token})
            } else {
                res.status(400).json({message: "User or password wrong"})
            }
        }).catch(err =>{
            res.status(400).json({message: "Invalid credentials", details: err})
        })

    }

    static googleSign(req,res){
        var {googleToken} = req.body
        let createNewUser = false;
        client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.CLIENT,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]

        }).then(ticket=>{
            const payload = ticket.getPayload();
            let searchEmailParam = {
                where:{
                    email:payload.email
                }
            }

            User.findOne(searchEmailParam)
            .then(user=>{
                if(user){
                    return user
                } else {
                    let input = {
                         email:payload.email,
                         password:"apaaja"
                    }
                    createNewUser = true
                    return User.create(input)
                }
            }).then(user=>{
                if(createNewUser){
                    let token = jwt.jwtSign({id:user.id,email:user.email})
                    res.status(201).json({token})
                }
                else{
                    let token = jwt.jwtSign({id:user.id,email:user.email})
                    res.status(200).json({token})
                }
            }).catch(err=>{
                console.log(err)
            })
        })
    }
}

module.exports = userController