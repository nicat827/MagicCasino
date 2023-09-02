import React, { useRef } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useState } from 'react';
import clChat from './Chat.module.css'
import Button from '../../UI/Button/Button';
import clButton from '../../UI/Button/Button.module.css';
import Input from '../../UI/input/Input';
import clInput from '../../UI/input/Input.module.css';
import Span from '../../UI/span/Span';
import clSpan from '../../UI/span/Span.module.css';
import ChatItem from './ChatItem';
import { useEffect } from 'react';
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import socket from '../../socket';

const Chat = () => {
  
   
    
    
    const {hiddenChat, setHiddenChat} = useContext(AuthContext)
    const [chatMessage, setChatMessage] = useState('')
    const {store} = useContext(Context)
    const {banned, muteDiv, secondMuteDiv, oneHourMuteDiv, threeHourMuteDiv, halfDayMuteDiv, dayMuteDiv, banChat,  setMuteDiv, setSecondMuteDiv, setHalfDayMuteDiv, setDayMuteDiv, setOneHourMuteDiv, setThreeHourMuteDiv,  setBanChat} = useContext(AuthContext)
    const [scroll, setScroll] = useState(false)

    const [firstBan, setFirstBan] = useState(false)    
    const [secondBan, setSecondBan] = useState(false)    
    const [oneHourBan, setOneHourBan] = useState(false)
    const [threeHourBan, setThreeHourBan] = useState(false)
    const [halfDayBan, setHalfDayBan] = useState(false)
    const [dayBan, setDayBan] = useState(false)
    const [foreverBan, setForeverBan] = useState(false)
    const [sendKd, setSendKd] = useState(false)

    const chatBody = useRef(null)
    const inputRef = useRef(null)
   

    const hideChat = () => {
        setHiddenChat(true)
    }

   
    useEffect(() => {
      
        socket.on("get_message", (data) => { 
            console.log('50 chat')
            console.log(data)
            if (data === 'Вы были заблокированны на 15 минут!') {
                setMuteDiv(true)
                setTimeout(() => {
                    setMuteDiv(false)
                    
                }, 2900)
            }
            if (data === 'Вы были заблокированны на 30 минут!') {
                setSecondMuteDiv(true)
                setTimeout(() => {
                    setSecondMuteDiv(false)
                   
                }
                , 2900)
            }
            if (data === 'Вы были заблокированны на 1 час!') {
                setOneHourMuteDiv(true)
                setTimeout(() => {
                    setOneHourMuteDiv(false)
                    
                }, 2900)
            }
            if (data === 'Вы были заблокированны на 3 часа!') {
                setThreeHourMuteDiv(true)
                setTimeout(() => {
                    setThreeHourMuteDiv(false)
                   
                }, 2900)
            }
            if (data === 'Вы были заблокированны на 12 часов!') {
                setHalfDayMuteDiv(true)
                setTimeout(() => {
                    setHalfDayMuteDiv(false)
                    
                }, 2900)
            }
            if (data === 'Вы были заблокированны на сутки!') {
                setDayMuteDiv(true)
                setTimeout(() => {
                    setDayMuteDiv(false)
                    
                }, 2900)
            }
            
            if (data === 'Вы были заблокированны навсегда!') {
                setBanChat(true)
                setTimeout(() => {
                    setBanChat(false)
                    
                }, 2900)
                
            }
            else if (typeof data !== 'string') {
                store.setMessagesMassive(data)
                 if ( chatBody.current && chatBody.current.scrollTop >= 200) {
                    console.log(chatBody.current.scrollTop )
                    
                    setScroll(false)
                }
                else {
                    setScroll(true)
                } 
                if ( chatBody.current && !scroll) {
                    console.log(chatBody.current.scrollTop )
                    console.log(chatBody)
                    setTimeout(() => chatBody.current.scrollTo(0, 1500), 555)
                }
            }
           
            
        })
        
        return () => {
            socket.off('get_message')
        }
        
    }, []) 

   

      
    const sendMessage = async (e, message) => {
        
        e.preventDefault();
        setChatMessage('')
        socket.emit("send_message",
         {
                email:store.user.email,
                message,
                name:store.user.name,
                surname: store.user.surname,
                photo:store.user.photo,
                id:store.id
            }
            )    
        
        
    }
    

   
   
    return (
       
        
        <div className={hiddenChat ? clChat.hiddenChat : clChat.chat} style={hiddenChat ? {zIndex:'0'} : null}>
            
            <div className={hiddenChat ? clChat.hidden__header : clChat.chat__header}>
                <svg id={clChat.chat__icon} style={hiddenChat ? {cursor:'pointer'} : {cursor:'auto'}} onClick={() => setHiddenChat(false)} width="8336" height="7525" viewBox="0 0 8336 7525" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4161 0.382812C1854.97 0.382812 0.677823 1564.51 0.677823 3494.14C0.677823 4327.6 348.866 5089.5 929.779 5689.48C725.921 6535.54 44.711 7289.72 36.5567 7298.12C-0.137604 7335.92 -10.3305 7394.44 12.0938 7444.82C32.4633 7495.22 77.6708 7524.88 130.674 7524.88C1211.12 7524.88 2007.79 6991.4 2423.66 6661.68C2955.8 6867.44 3549.28 6987.38 4175.21 6987.38C6481.23 6987.38 8335.53 5423.08 8335.53 3508.74C8335.53 1594.41 6467.04 0.382812 4161 0.382812ZM2058.82 4031.64C1769.34 4031.64 1536.95 3792.28 1536.95 3509.24C1536.95 3226.22 1769.34 2971.74 2058.82 2971.74C2348.29 2971.74 2580.69 3211.1 2580.69 3509.24C2580.69 3807.4 2362.16 4031.64 2058.82 4031.64ZM4161 4031.64C3871.53 4031.64 3653.81 3792.28 3653.81 3509.24C3653.81 3226.22 3886.21 2971.74 4161 2971.74C4435.79 2971.74 4668.19 3211.1 4668.19 3509.24C4668.19 3807.4 4451.29 4031.64 4161 4031.64ZM6233.82 4031.64C5944.35 4031.64 5711.94 3792.28 5711.94 3509.24C5711.94 3226.22 5944.35 2971.74 6233.82 2971.74C6523.29 2971.74 6755.69 3211.1 6755.69 3509.24C6755.69 3807.4 6537.16 4031.64 6233.82 4031.64Z" fill="#050502"/>
                    <path d="M6233.82 4031.64C5944.35 4031.64 5711.94 3792.28 5711.94 3509.24C5711.94 3226.22 5944.35 2971.74 6233.82 2971.74C6523.29 2971.74 6755.69 3211.1 6755.69 3509.24C6755.69 3807.4 6537.16 4031.64 6233.82 4031.64Z" fill="#FDFDF2"/>
                    <path d="M4161 4031.64C3871.53 4031.64 3653.81 3792.28 3653.81 3509.24C3653.81 3226.22 3886.21 2971.74 4161 2971.74C4435.79 2971.74 4668.19 3211.1 4668.19 3509.24C4668.19 3807.4 4451.29 4031.64 4161 4031.64Z" fill="white"/>
                    <path d="M2058.82 4031.64C1769.34 4031.64 1536.95 3792.28 1536.95 3509.24C1536.95 3226.22 1769.34 2971.74 2058.82 2971.74C2348.29 2971.74 2580.69 3211.1 2580.69 3509.24C2580.69 3807.4 2362.16 4031.64 2058.82 4031.64Z" fill="#FFFFFC"/>
                </svg>

                <Span className={clSpan.chat__span}>
                    Онлайн чат
                </Span>
                <div className={clChat.chat__hideIconDiv} onClick={hideChat}>
                    <svg width="13" height="15" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 20.2975L8.65317 11.5L0 2.7025V0H2.66397L14 11.5L2.66397 23H0V20.2975Z" fill="white"/>
                    </svg>
                </div>
            </div> 
            <div className={hiddenChat ? clChat.hidden__body : clChat.chat__body}>
                <div style={ store.isAdmin ? {height:'84%'} :{height:'87%'}} className={clChat.chatItem__body} ref={chatBody} onScroll={() => {
                    
                    if (chatBody.current.scrollTop < 260) {
                        setScroll(true)
                    }
                    else{
                        setScroll(false)
                    }
                    
                    }} >
                    <ChatItem firstBan={firstBan} secondBan={secondBan} oneHourBan={oneHourBan} threeHourBan={threeHourBan} halfDayBan={halfDayBan} dayBan={dayBan} foreverBan={foreverBan} messages={store.messagesMassive} message={chatMessage} setMessage={setChatMessage} inputRef={inputRef} />

                    
                </div>
                
                <div className={clChat.chat__footer}>
                {store.isAdmin && (
                    <div className={clChat.chatBan__btnsDiv}>
                        <button style={firstBan ? {backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!firstBan) {
                                setFirstBan(true)
                                setSecondBan(false)
                                setOneHourBan(false)
                                setThreeHourBan(false)
                                setHalfDayBan(false)
                                setDayBan(false)
                                setForeverBan(false)
                            }
                            else {
                                setFirstBan(false)
                            }

                            
                            }}>15m</button>
                        <button style={secondBan ? {backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!secondBan) {
                                setSecondBan(true)
                                setFirstBan(false)
                                setOneHourBan(false)
                                setThreeHourBan(false)
                                setHalfDayBan(false)
                                setDayBan(false)
                                setForeverBan(false)
                            }
                            else {
                                setSecondBan(false)
                            }
                            
                            }}>30m</button>
                        <button style={oneHourBan ? {backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!oneHourBan) {
                                setOneHourBan(true)
                                setFirstBan(false)
                                setSecondBan(false)
                                setThreeHourBan(false)
                                setHalfDayBan(false)
                                setDayBan(false)
                                setForeverBan(false)
                            }
                            else {
                                setOneHourBan(false)
                            }
                            
                            }}>1ч</button>
                        <button style={threeHourBan ?{backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!threeHourBan) {
                                setThreeHourBan(true)
                                setFirstBan(false)
                                setSecondBan(false)
                                setOneHourBan(false)
                                setHalfDayBan(false)
                                setDayBan(false)
                                setForeverBan(false)
                            }
                            else {
                                setThreeHourBan(false)
                            }
                            
                            }}>3ч</button>
                        <button style={halfDayBan ? {backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!halfDayBan) {
                                setHalfDayBan(true)
                                setFirstBan(false)
                                setSecondBan(false)
                                setOneHourBan(false)
                                setThreeHourBan(false)
                                setDayBan(false)
                                setForeverBan(false)
                            }
                            else {
                                setHalfDayBan(false)
                            }
                            
                            }}>12ч</button>
                        <button style={dayBan ? {backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!dayBan) {
                                setDayBan(true)
                                setFirstBan(false)
                                setSecondBan(false)
                                setOneHourBan(false)
                                setThreeHourBan(false)
                                setHalfDayBan(false)
                                setForeverBan(false)
                            }
                            else {
                                setDayBan(false)
                            }
                            
                            }}>24ч</button>
                        <button style={foreverBan ? {backgroundColor:'black', color:'white', transition:'1s'} : null} className={clChat.chatBan__btn} onClick={() => {
                            if (!foreverBan) {
                                setForeverBan(true)
                                setFirstBan(false)
                                setSecondBan(false)
                                setOneHourBan(false)
                                setThreeHourBan(false)
                                setHalfDayBan(false)
                                setDayBan(false)    
                            }
                            else {
                                setForeverBan(false)
                            }
                            
                            }}>БАН</button>
                    </div>
                )}
                
                

                <div className={clChat.inputChat__div}>
                    <form onSubmit={(e) =>  sendMessage(e, chatMessage)}>
                    <input
                        placeholder='Введите сообщение' 
                        className={clChat.chat__input} 
                        maxLength='130'
                        ref={inputRef}
                        value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
                    />

                

                <Button 
                className={clChat.chat__sendMessageBtn}
                 
                style={store.isAuth && chatMessage &&    !sendKd &&  !muteDiv  && !secondMuteDiv && !oneHourMuteDiv && !threeHourMuteDiv && !halfDayMuteDiv && !dayMuteDiv && !banChat ? {cursor:'pointer', backgroundColor: 'rgb(253, 186, 3)', borderRadius:'5px'} : {cursor:'not-allowed', borderRadius:'5px'}} 
                
                
                disabled={store.isAuth && chatMessage && !sendKd && !muteDiv && !secondMuteDiv && !oneHourMuteDiv && !threeHourMuteDiv && !halfDayMuteDiv && !dayMuteDiv && !banChat ? false  : true}>


                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.9895 1.00771L12.2394 12.3583C12.1984 12.6244 12.0378 12.8565 11.8027 12.9885C11.6703 13.0629 11.5219 13.1006 11.374 13.1006C11.2595 13.1006 11.1465 13.0783 11.0379 13.033L7.68546 11.6357L6.29471 13.7218C6.18806 13.9043 6.01032 14 5.81891 14C5.50444 14 5.25014 13.7457 5.25014 13.4312V10.8013C5.25014 10.6067 5.315 10.4176 5.4345 10.2642L11.3754 2.62485L3.34421 9.8519L0.538375 8.68157C0.230692 8.55305 0.0221751 8.2632 0.00166657 7.905C-0.018842 7.54679 0.151215 7.25639 0.440822 7.09096L12.6912 0.115475C12.9836 -0.0515701 13.3442 -0.0362027 13.621 0.153921C13.8977 0.344045 14.0415 0.675756 13.9895 1.00771Z" fill="black"/>
                </svg>

                </Button>
                </form> 
                </div>
                
            
              
            </div>
            </div>
        </div>
        
       
        
    );
};

export default observer(Chat);