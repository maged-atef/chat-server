import mongoose from "mongoose"; 


const connect_to_db = async()=>{
   const db=  await mongoose.connect(process.env.CONNECTION_STRING).then(()=>{
        console.log('mongoose DB  is connected ')
    }).catch((error)=>{
        console.log("mongoose DB connection Error: ",error.message)
    })
    return db
}

export default connect_to_db