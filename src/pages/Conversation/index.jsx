// Import
import "./Conversation.css";
import HeaderCustom from "../../components/HeaderCustom";
import LeftBar from "../../components/LeftBar";
import HeaderConversation from "../../components/HeaderConversation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useNavigate, useParams } from "react-router-dom";
import socket from '../../socket';
import { React, useState, useEffect} from 'react';

// Page de conversation (propre à deux utilisateurs et une annonce)
function Conversation() {
    // Variables
    useEffect(() => {
        getAnnonce();
        getPrecedentMesssages();
    }, [])
    


    let [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("user joined", (msg) => {});
    
        return () => {
          socket.off("user joined");
        };
    }, []);

    // Déclaration de la variable annonce
    const [annonce, setAnnonce] = useState([]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    // Pour pouvoir récupérer un paramètre passer par l'URL
    const params = useParams();

    const connectedUser = sessionStorage.getItem("user");
    const username = JSON.parse(connectedUser).pseudo;
    const photo = JSON.parse(connectedUser).profilPic;
   
    let otherUser = params.acheteur;
    if(username === otherUser) otherUser = params.vendeur;

    socket.auth = { username }; // attach { object } to auth
    socket.connect();


    const sendMsg = async (e) => {

        let result = await fetch(`https://sellyourself.fr:5000/api/addMessageChat`, {
            method: "POST",
            body: JSON.stringify({annonce: params.annonce, vendeur: params.vendeur, acheteur: params.acheteur, author: username, content: message}),
            headers: {
                'Content-Type': 'Application/json',
                authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
            }
        });


        socket.emit("message", {
            id: Date.now(),
            name: username,
            message: message,
            to: otherUser,
            annonce: params.annonce,
            //photo: photo 
          });
          setMessage("");
    }

    socket.on("message", (data) => {
        if((params.acheteur !== data.name && params.vendeur !== data.name)) return;
        if((params.acheteur !== data.to && params.vendeur !== data.to)) return;
        if(data.annonce !== params.annonce) return;

        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: data.id,
            name: data.name,
            message: data.message,
            //photo: data.photo,
          },
        ]);
    });

    


    // Fonction pour récupérer l'annonce sujette de la conversation
    const getAnnonce = async () => {
        let result = await fetch(`https://sellyourself.fr:5000/api/annonce/${params.annonce}`, {
                method: "Get",
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
        result = await result.json();
        setAnnonce(result);
    }

    const getPrecedentMesssages = async () => {
        let result = await fetch(`https://sellyourself.fr:5000/api/getChat/${params.annonce}/${params.vendeur}/${params.acheteur}`, {
                method: "Get",
                headers: {
                    'Content-Type': 'Application/json',
                    authorization: `bearer ${JSON.parse(sessionStorage.getItem('token'))}`
                }
            });
        result = await result.json();

        for(let i = 0; i < result.success.length; i++) {
            setMessages((previousMessages) => [
                ...previousMessages,
                {
                  name: result.success[i].author,
                  message: result.success[i].content,
                },
            ]);
        }
    }

    if(username !== params.vendeur && username !== params.acheteur ) {
        navigate(`/`);
    }

    // On return l'HTML de la page
    return (
        <div className='Conversation'>
            <LeftBar/>
            <div className='Conversation-center'>
                <div className="Conversation-header">
                    <HeaderCustom title="Conversation"/>
                </div>
                <div className="Conversation-info">
                    <HeaderConversation 
                        image={annonce.image}
                        titre={annonce.titre}
                        description={annonce.description}
                        id={annonce._id}
                        vendu={annonce.vendu}
                        user={annonce.utilisateur}
                    />
                    <div className="Conversation-listMsg">
                        {messages.map((m) => (
                            <div className="Conversation-aMsg" key={m.id}>
                                <b>{m.name}</b> {m.message}
                            </div>
                        ))}
                    </div>
                    <div className="Conversation-newMessage">
                        <input className="Conversation-bar" placeholder="Envoyer un message" value={message} onChange={e => {setMessage(e.target.value)}}/>
                        <button onClick={sendMsg} className="Conversation-envoyer">
                            Envoyer
                            <FontAwesomeIcon className="Conversation-icon" icon={faPaperPlane}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation;