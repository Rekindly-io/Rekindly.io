import React from "react"
import io from "socket.io-client"

export const socket = io("http://localhost:2500/")
export const SocketContext = React.createContext(socket)
