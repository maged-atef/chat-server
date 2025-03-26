import express from 'express'

import bootstrap from './src/app.controller.js'
import { Server } from "socket.io";



const app = express()

await bootstrap(app, express);


export const express_server = app.listen(process.env.PORT, (error) => {
    (error) ? console.log('Express Server Error: ', error.message) : console.log("Express Server is Running")
})


// *--->> initialize socket io server on express listening port & make cors public 
const io = new Server(express_server, { cors: { origin: "*" } })

// *---->> socket middle ware to get user info
io.use((socket, next) => {

    const data = socket.handshake.auth;
    socket.data = data;
    socket.id = data.id
    console.log({ socket: socket.id })
    console.log({ socket_email: data.email })
    console.log({ socket_username: data.username })
    return next()
})

// *-->> listening on connection
io.on("connection", (socket) => {

    // ^===>> Create empty arr to push users to it
    let users = [];

    // ^====>> current connected sockets
    const current_online_sockets = io.of('/').sockets;

    // ^====>> loop through it and push to arr users
    for (const [id, socket] of current_online_sockets) {
        // console.log({id, username: socket.data.username})
        users.push({ id, username: socket.data.username })
    }

    // &===> sending online users to all 
    io.emit('users', users)

    // * ===>> emit that user is connected to all except myself
    socket.broadcast.emit("connected_user", { username: socket.data.username, id: socket.id })
    
    // *====> listening on disconnect event and emit that user is disconnected
    socket.on("disconnect", () => {
        socket.broadcast.emit("disconnected_user", { username: socket.data.username, id: socket.id })
    })
    // *====> listening on private msg
    socket.on("private-message",(payload)=>{
        socket.to(payload.to).emit("msg",{msg: payload.msg , from: payload.from , username: socket.data.username})
    })
})
