import "./HeaderConversation.css"
import React from 'react';

function HeaderConversation() {
  return(
    <div className="HeaderConversation">
        <img className="HeaderConversation-image"></img>
        <div className="HeaderConversation-contenu">
            <p className="HeaderConversation-titre"></p>
            <p className="HeaderConversation-description"></p>
        </div>
        <button className="HeaderConversation-button">
            
        </button>
    </div>
  )
}

export default HeaderConversation;