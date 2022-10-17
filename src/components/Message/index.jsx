import './Message.css';



function Message() {
    return(
        <div className='Message'>
            <div className='Message-deleteAllButton'>
                <button className='Message-deleteAll'>
                    Supprimer tous !
                </button>
            </div>
        </div>
    )
}

export default Message;