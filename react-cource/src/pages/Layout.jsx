import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext} from '../context';
import Chat from '../components/chat/Chat';
import Header from '../components/header/Header';
import { Context } from '..';
import ErrorDiv from '../UI/Error/ErrorDiv';

const Layout = () => {
    const {isAuth, setAuth} = useContext(AuthContext)
    const {errorDiv,setErrorDiv}= useContext(AuthContext)
    const {store} = useContext(Context)
    const {email} = useContext(AuthContext)

   

    return (
        <>
            <Header/>
            {errorDiv && (
                <ErrorDiv>{`Пользователь с почтовым адресом ${email+'@yandex.ru'} уже существует`}</ErrorDiv>
                )
            }
             
            <Chat/>
            <div className='App'>
                <Outlet/>
            </div>    
        </>
    );
};

export default Layout;