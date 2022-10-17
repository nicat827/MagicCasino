import React, { useContext, useEffect } from 'react';
import { Context } from '../..';
import { AuthContext } from '../../context';
import Span from '../../UI/span/Span';
import clSpan from '../../UI/span/Span.module.css';
import clChat from './Chat.module.css';
const ChatItem = (props) => {

    const {store} = useContext(Context)

    
    
    return (
        <>
        {props.messages.map((obj) => {
            if (obj.email) {
                return (
                    <div key={obj._id} className={clChat.messageBox}>
                        <div className={clChat.chatNickname__div}>
                            <Span className={clSpan.chatEmail}>{obj.email}</Span>
                            <Span className={clSpan.chatDate}>{obj.date}</Span>
                        </div>
                        
                        <Span className={clSpan.chatMessage}>{obj.message}</Span>
                    </div>  
                    
                ) 
            }

            else if (obj.name) {
                return (
                    <div key={obj._id} className={clChat.messageBox}>
                        <div className={clChat.chatNickname__div}>
                            <div className={clChat.message__div}>
                                <img src={obj.photo} className={clChat.chatUserIcon}></img>
                                <Span onClick={() => {
                                        props.setMessage(`@${obj.name},`)
                                        console.log(props.inputRef)
                                        props.inputRef.current.focus()
                                    
                                    }} className={clSpan.chatEmail} >{obj.name}</Span>
                                <Span className={clSpan.chatSurname}>{obj.surname}</Span>
                                
                            </div>
                            <Span className={clSpan.chatDate}>{obj.date}</Span>
                            
                        </div>
                        {obj.message.includes(`@${store.user.name},`)
                            ?  
                                <div className={clChat.message}>
                                <Span className={clSpan.chatMessage__reply}>{`@${store.user.name},`}</Span>
                                <Span className={clSpan.chatMessage}>{obj.message.slice(`@${store.user.name},`.length, obj.message.length)}</Span>
                                </div>
                            : 
                                <Span className={clSpan.chatMessage}>{obj.message}</Span>}
                        
                    </div>
                )  
            }
            
            
        })
        }
        </>
    );
};

export default ChatItem;