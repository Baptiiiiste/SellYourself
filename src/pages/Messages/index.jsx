import "./Messages.css";
import React from 'react';
import HeaderCustom from "../../components/HeaderCustom";
import Message from "../../components/Message";
import LeftBar from "../../components/LeftBar";

const messages = [
    // img:
]

function Messages() {
    return (
        <div className='Messages'>
            <LeftBar/>
            <div className='Messages-center'>
                <div className="Messages-header">
                    <HeaderCustom title="Messages"/>
                </div>
                <div className="Messages-info">
                    {messages.map(({ info,message }, index) => (
                        <Message/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Messages;