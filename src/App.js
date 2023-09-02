import React, { useContext, useEffect, useState } from 'react';
import AppRouter from './pages/AppRouter';
import './styles/App.css'
import {AuthContext, ModalContext} from './context/index.js'
import { Context } from '.';
import {observer} from "mobx-react-lite";
import {InfinitySpin} from 'react-loader-spinner'
import Span from './UI/span/Span';
import socket from './socket'
const App = () => {
  const {store} = useContext(Context)
  const [errorDiv, setErrorDiv] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [emptyInput, setEmptyInput] = useState(false)
  const [email, setEmail] = useState('')
  const [hiddenChat, setHiddenChat] = useState(false)
  const [promocodes, setPromocodes] = useState([])
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [alreadyUsed, setAlreadyUsed] = useState(false)
  const [limit, setLimit] = useState(false)
  const [banChat, setBanChat] = useState(false)
  const [banned, setBanned] = useState(false)
  const [muteDiv, setMuteDiv] = useState(false)
  const [secondMuteDiv, setSecondMuteDiv] = useState(false)
  const [oneHourMuteDiv, setOneHourMuteDiv] = useState(false)
  const [threeHourMuteDiv, setThreeHourMuteDiv] = useState(false)
  const [halfDayMuteDiv, setHalfDayMuteDiv] = useState(false)
  const [dayMuteDiv, setDayMuteDiv] = useState(false)
  const [rightMenu, setRightMenu] = useState(false)
  
 
  useEffect(() => {
    
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])
  
  useEffect(() =>  {
      if (localStorage.getItem('sid')) {
        
       store.checkAuthVk()
        
      }
  }, [])

  useEffect(() => {
    socket.on("message", async (data) => {
     
      store.setMessagesMassive(data)
    })
           

  }, [socket])

  useEffect(()=> {
    if (store.id) {
      socket.emit('connected', store.id)
    }
    
  }, [store.id])
  
  if(store.isLoading) {
    return (
    <div className='loader__div'>
      <InfinitySpin width='300' color='yellow'/>
      
    </div>)
  } 
  
  



  return (
      
      
      <>
      
      <AuthContext.Provider value={{
       
        
       modalLogin,
       setModalLogin,
       emptyInput,
       setEmptyInput,
       errorDiv,
       setErrorDiv,
       email,
       setEmail,
       hiddenChat,
       setHiddenChat,
       promocodes,
       setPromocodes,
       success,
       setSuccess,
       error,
       setError,
       notFound,
       setNotFound,
       alreadyUsed,
       setAlreadyUsed,
       limit,
       setLimit,
       banChat,
       setBanChat,
       banned,
       setBanned,
       muteDiv,
       setMuteDiv,
       secondMuteDiv,
       setSecondMuteDiv,
       oneHourMuteDiv,
       setOneHourMuteDiv,
       threeHourMuteDiv,
       setThreeHourMuteDiv,
       halfDayMuteDiv,
       setHalfDayMuteDiv,
       dayMuteDiv,
       setDayMuteDiv,
       rightMenu,
       setRightMenu
       
       
      
     }}
     >
       <AppRouter/>
       
     </AuthContext.Provider>
      </>
      
  );
};

export default observer(App);