import React, { useContext, useEffect, useState } from 'react';
import AppRouter from './pages/AppRouter';
import './styles/App.css'
import {AuthContext, ModalContext} from './context/index.js'
import { Context } from '.';
import {observer} from "mobx-react-lite";

const App = () => {
  const {store} = useContext(Context)
  const [errorDiv, setErrorDiv] = useState(false)
  const [modalLogin, setModalLogin] = useState(false)
  const [emptyInput, setEmptyInput] = useState(false)
  const [email, setEmail] = useState('')
  const [hiddenChat, setHiddenChat] = useState(false)

  
  
  useEffect(() => {
    
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])
  
  useEffect(() => {
    if (localStorage.getItem('sid')) {
      
      store.checkAuthVk()
    }
  }, [])

 
  
  
  

 

  
  



 




  return (
      
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
        setHiddenChat
        
       
      }}
      >
        <AppRouter/>
        
      </AuthContext.Provider>

     

      
      
    
    
    
  );
};

export default observer(App);