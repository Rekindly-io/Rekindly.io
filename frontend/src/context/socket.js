import React from "react"
import socketio from "socket.io-client"

export const socket = socketio.connect("http://34.69.201.15:2500/")
export const SocketContext = React.createContext()
