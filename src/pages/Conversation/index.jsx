import "./Conversation.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import LeftBar from "../../components/LeftBar";
import HeaderConversation from "../../components/HeaderConversation";

function Conversation() {
    return (
        <div className='Conversation'>
            <LeftBar/>
            <div className='Conversation-center'>
                <div className="Conversation-header">
                    <HeaderCustom title="Conversation"/>
                </div>
                <div className="Conversation-info">
                    <HeaderConversation/>
                    test
                </div>
            </div>
        </div>
    )
}

export default Conversation;