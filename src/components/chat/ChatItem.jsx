import React, { useContext, useEffect } from 'react';
import { Context } from '../..';
import { AuthContext } from '../../context';
import Span from '../../UI/span/Span';
import clSpan from '../../UI/span/Span.module.css';
import clChat from './Chat.module.css';
import {observer} from "mobx-react-lite";

const ChatItem = ({messages, firstBan, secondBan, oneHourBan, threeHourBan, halfDayBan, dayBan, foreverBan, message, setMessage, inputRef}) => {

    const {store} = useContext(Context);
    
    
    const {banned, muteDiv, setMuteDiv, setSecondMuteDiv, setHalfDayMuteDiv, setDayMuteDiv, setOneHourMuteDiv, setThreeHourMuteDiv,  setBanChat} = useContext(AuthContext)
    const banUser = async (id,time) => {

        const res = await store.banUser(id, time)
        if (res.ban) {
            if (time===0) {
                setBanChat(true)
                setTimeout(() => setBanChat(false), 2900)
            }
            if (time === 900000) {
                setMuteDiv(true)
                setTimeout(() => setMuteDiv(false), 2900)
            }
            if (time === 1800000) {
                setSecondMuteDiv(true)
                setTimeout(() => setSecondMuteDiv(false), 2900)
            }
            if (time === 3600000) {
                console.log(time)
                setOneHourMuteDiv(true)
                setTimeout(() => setOneHourMuteDiv(false), 2900)
            }
            if (time === 1800000*2*3) {
                setThreeHourMuteDiv(true)
                setTimeout(() => setThreeHourMuteDiv(false), 2900)
            }
            if (time === 1800000*2*3*4) {
                setHalfDayMuteDiv(true)
                setTimeout(() => setHalfDayMuteDiv(false), 2900)
            }
            if (time === 1800000*2*3*4*2) {
                setDayMuteDiv(true)
                setTimeout(() => setDayMuteDiv(false), 2900)
            }
        }

        

        store.getMessage();
    }
  
    
    return (
        <>
        {messages.map((obj) => {
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
                                        setMessage(`@${obj.name},`)
                                        console.log(inputRef)
                                        inputRef.current.focus()
                                    
                                    }} className={clSpan.chatEmail} >{obj.name}</Span>
                                <Span className={clSpan.chatSurname}>{obj.surname}</Span>
                                
                            </div>
                            
                            <div className={clChat.checkBox}>
                            {store.isAdmin && (
                                <svg onClick={() => {
                                    if (foreverBan) {
                                        const confirm = window.confirm('Забанить его навсегда?')
                                        if (confirm) {
                                            banUser(obj.id, 0)
                                        }
                                    }
                                    else if (firstBan) {
                                        banUser(obj.id, 900000)
                                    }
                                    else if (secondBan) {
                                        banUser(obj.id, 1800000)
                                    }
                                    else if (oneHourBan) {
                                        banUser(obj.id, 3600000)
                                    }
                                    else if (threeHourBan) {
                                        banUser(obj.id, 1800000*2*3)
                                    }
                                    else if (halfDayBan) {
                                        banUser(obj.id, 1800000*2*3*4)
                                    }
                                    else if (dayBan) {
                                        banUser(obj.id, 1800000*2*3*4*2)
                                    }
                                }} className={clChat.checkBox__icon} xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                                    <path d="m10.6 16.2 7.05-7.05-1.4-1.4-5.65 5.65-2.85-2.85-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z"/>
                                </svg>
                            )}
                                
                                <Span className={clSpan.chatDate}>{obj.date}</Span>
                            </div>
                            
                            
                            
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

export default observer(ChatItem);