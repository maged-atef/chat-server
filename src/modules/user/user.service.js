import { Server } from "socket.io"
import { express_server } from "../../../index.js"
import User from "../../db/models/user.model.js"


export const register = async(req ,res ,next)=>{
    const {email , password , username} = req.body
    if(email=="" || password=="" || username=="") return res.status(404).json({success:false , msg:"all fields are required "})
   
    const create_new = await User.create({ email: email, username:username, password:password })

    res.status(201).json({success:true , msg:"user created "})
}

export const login = async(req ,res ,next)=>{
    console.log('hit')
    const {email , password } = req.body
    if(email=="" || password=="" ) return res.status(404).json({success:false , msg:"all fields are required "})
   
    const find_user = await User.findOne({ email: email})
    if(!find_user) return res.status(404).json({success:false , msg:"user not registered "})
        console.log(typeof find_user.password)
    console.log(typeof password)
    if(find_user.password != password.toString()) return res.status(404).json({success:false , msg:"wrong credentials "})
    
    
     return res.status(201).json({success:true , msg:"user logged in  ", data: find_user})
}

