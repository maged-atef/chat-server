import { Router } from "express";
import * as user_service from './user.service.js'

const route = Router() 

route.post('/register', user_service.register)
route.post('/signin', user_service.login)

export default route 