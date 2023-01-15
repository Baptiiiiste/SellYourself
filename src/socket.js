import { io } from "socket.io-client";

const URL = "http://localhost:5050";
const socket = io(URL, {
  path: "/socket.io",
  reconnection: false,
});




export default socket;