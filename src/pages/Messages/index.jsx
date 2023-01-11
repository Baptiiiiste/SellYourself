// Import
import "./Messages.css";
import React from 'react';
import { Link } from "react-router-dom";
import HeaderCustom from "../../components/HeaderCustom";
import Message from "../../components/Message";
import LeftBar from "../../components/LeftBar";

const messages = [
    {photo: "DefaultPP.jpeg", prenom: "John", nom: "Doe", text: "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"},
    {photo: "DefaultPP.jpeg", prenom: "John", nom: "Doe", text: "Je suis un message"},
]

// Page message
function Messages() {
    // Affichage HTML
    return (
        <div className='Messages'>
            <LeftBar/>
            <div className='Messages-center'>
                <div className="Messages-header">
                    <HeaderCustom title="Messages"/>
                </div>
                <div className="Messages-info">
                    {messages.map(({ photo, nom, prenom, text }, index) => (
                        <Link className="Messages-all" to="/conversation">
                            <Message
                                photo={photo}
                                nom={nom}
                                prenom={prenom}
                                text={text}
                                key={index}/>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Messages;