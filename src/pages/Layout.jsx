import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthContext} from '../context';
import Chat from '../components/chat/Chat';
import Header from '../components/header/Header';
import { Context } from '..';
import ErrorDiv from '../UI/Error/ErrorDiv';
import Loader from '../components/loader/Loader';
import { observer } from 'mobx-react-lite';
import Success from '../UI/Success/Success';
import limit from '../UI/Error/ErrorDiv.module.css'
import BanChat from '../UI/Ban/BanChat';
const Layout = () => {
    
    const {errorDiv, setErrorDiv}= useContext(AuthContext)
    const {store} = useContext(Context)
    const {email} = useContext(AuthContext)
    const {success} = useContext(AuthContext)
    const {error} = useContext(AuthContext)
    const {notFound} = useContext(AuthContext)
    const {alreadyUsed} = useContext(AuthContext)
    const {limit} = useContext(AuthContext)
    
    const {muteDiv, secondMuteDiv, oneHourMuteDiv, threeHourMuteDiv, halfDayMuteDiv, dayMuteDiv, banChat} = useContext(AuthContext)

   

    return (
        <>
            <Header/>
            {success && <Success>Промокод успешно активирован</Success>}
            {error && <ErrorDiv>Данный код уже не может быть использован</ErrorDiv>}
            {alreadyUsed && <ErrorDiv>Вы уже использовали этот промокод</ErrorDiv>}
            {limit && <ErrorDiv>Сегодня вы уже активировали обычный промокод</ErrorDiv>}
            {banChat && <BanChat>Вы забанены в чате навсегда!</BanChat>}
            {store.error && <BanChat>Недостаточно средств!</BanChat>}
            {muteDiv && <BanChat>Вы были заблокированы в чате на 15 минут!</BanChat>}
            {secondMuteDiv && <BanChat>Вы были заблокированы в чате на 30 минут!</BanChat>}
            {oneHourMuteDiv && <BanChat>Вы были заблокированы в чате на 1 час!</BanChat>}
            {threeHourMuteDiv && <BanChat>Вы были заблокированы в чате на 3 часа!</BanChat>}
            {halfDayMuteDiv && <BanChat>Вы были заблокированы в чате на 12 часов!</BanChat>}
            {dayMuteDiv && <BanChat>Вы были заблокированы в чате на сутки!</BanChat>}
            {notFound && <ErrorDiv>Промокод не найден</ErrorDiv>}
            {store.isLoading && (<Loader></Loader>)}
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

export default observer(Layout);