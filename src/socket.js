import { io } from "socket.io-client";

const URL = "https://sellyourself.fr";
const socket = io(URL, {
  path: "/socket.io",
  reconnection: false,
});




export default socket;