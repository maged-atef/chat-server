import connect_to_db from "./db/connectDB.js";
import userRouter from './modules/user/user.controller.js'
import cors from 'cors'

const bootstrap = async (app, express) => {
    app.use(cors({
        origin: "*"
    }))
    app.use(express.json())


    connect_to_db();
    app.get('/',(req, res, next)=>{
       return res.status(200).json({ success: true, msg: 'welcome ' })

    })
    app.use('/user', userRouter)
    app.all("*", (req, res, next) => {
        res.status(404).json({ success: false, msg: 'path not found ' })
    })
}

export default bootstrap