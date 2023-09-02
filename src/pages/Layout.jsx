import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Link, Outlet, useMatch } from 'react-router-dom';
import { AuthContext} from '../context';
import Chat from '../components/chat/Chat';
import Header from '../components/header/Header';
import { Context } from '..';
import ErrorDiv from '../UI/Error/ErrorDiv';
import Loader from '../components/loader/Loader';
import { observer } from 'mobx-react-lite';
import Success from '../UI/Success/Success';
import limit from '../UI/Error/ErrorDiv.module.css'
import cl from '../components/header/Header.module.css'
import BanChat from '../UI/Ban/BanChat';
import clChat from '../components/chat/Chat.module.css'
import CustomLink from '../UI/Links/CustomLink';
const Layout = () => {
    
    const {errorDiv, setErrorDiv}= useContext(AuthContext)
    const {store} = useContext(Context)
    const {email} = useContext(AuthContext)
    const {hiddenChat, setHiddenChat} = useContext(AuthContext)
    const {success} = useContext(AuthContext)
    const {error} = useContext(AuthContext)
    const {notFound} = useContext(AuthContext)
    const {alreadyUsed} = useContext(AuthContext)
    const {limit} = useContext(AuthContext)
    const [hovered, setHovered] = useState('')
    const [isLeave, setLeave] = useState(false)
    const {muteDiv, secondMuteDiv, oneHourMuteDiv, threeHourMuteDiv, halfDayMuteDiv, dayMuteDiv, banChat, rightMenu , setRightMenu} = useContext(AuthContext)

    const classic = useMatch('/classic')
    const wheel = useMatch('/wheel')
    const mines = useMatch('/mines')

    return (
          
 
            <div className='App' >
                <div className={rightMenu ? 'rightMenu__div active' : 'rightMenu__div'}>
                    <div className='rightMenu__inner'>
                    <svg onClick={() => setRightMenu(false)} className='menu-close-icon' xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill='#ebeffd'><path d="m6.4 19.2-1.6-1.6 5.6-5.6-5.6-5.6 1.6-1.6 5.6 5.6 5.6-5.6 1.6 1.6-5.6 5.6 5.6 5.6-1.6 1.6-5.6-5.6Z"/></svg>
                    <Link onClick={() => setRightMenu(false)} className='link' to='/mines'>
                        <svg style={{marginRight:'7px'}} width="20" height="20" viewBox="0 0 41 41" fill={mines ? "rgb(256,186,3)" : "#ebeffd"} xmlns="http://www.w3.org/2000/svg">
                            <path  d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z"/>
                        </svg>
                        MINES</Link>
                    <Link onClick={() => setRightMenu(false)} className='link' to='/wheel'>
                    <svg style={{marginRight:'7px'}} width="20" height="20" viewBox="0 0 35 35" fill={wheel ? "rgb(256,186,3)" : '#ebeffd'} xmlns="http://www.w3.org/2000/svg">
<path d="M7.65625 2.1875C7.95828 2.1875 8.20312 1.94266 8.20312 1.64062C8.20312 1.33859 7.95828 1.09375 7.65625 1.09375C7.35422 1.09375 7.10938 1.33859 7.10938 1.64062C7.10938 1.94266 7.35422 2.1875 7.65625 2.1875Z" fill="black"/>
<path d="M31.1719 28.4375C31.4739 28.4375 31.7188 28.1927 31.7188 27.8906C31.7188 27.5886 31.4739 27.3438 31.1719 27.3438C30.8698 27.3438 30.625 27.5886 30.625 27.8906C30.625 28.1927 30.8698 28.4375 31.1719 28.4375Z" fill="black"/>
<path d="M4.44556 4.375L2.83337 5.98719" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.83337 4.375L4.44556 5.98719" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M32.8125 33.3594C32.8125 32.7792 32.582 32.2228 32.1718 31.8126C31.7616 31.4023 31.2052 31.1719 30.625 31.1719H4.375C3.79484 31.1719 3.23844 31.4023 2.8282 31.8126C2.41797 32.2228 2.1875 32.7792 2.1875 33.3594V33.3594" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.10938 15.3125H27.8906" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 25.7031V4.92188" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.1527 22.6598L24.8473 7.96523" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8473 22.6598L10.1527 7.96523" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.92368 19.3452L27.0763 11.2798" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.5327 24.8888L13.4673 5.73617" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.5805 24.9353L21.4194 5.68969" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.1228 19.232L7.8772 11.393" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 14.7656L13.125 31.1719H21.875L17.5 14.7656Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 16.4062C18.1041 16.4062 18.5938 15.9166 18.5938 15.3125C18.5938 14.7084 18.1041 14.2188 17.5 14.2188C16.8959 14.2188 16.4062 14.7084 16.4062 15.3125C16.4062 15.9166 16.8959 16.4062 17.5 16.4062Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.5938 1.64062H16.4062V3.82812H18.5938V1.64062Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.5938 26.7969H16.4062V28.9844H18.5938V26.7969Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.82812 14.2188V16.4062H6.01562V14.2188H3.82812Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M28.9844 14.2188V16.4062H31.1719V14.2188H28.9844Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.60621 4.87164L7.05942 6.41844L8.60621 7.96523L10.153 6.41844L8.60621 4.87164Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.3937 22.6598L24.8469 24.2066L26.3937 25.7534L27.9405 24.2066L26.3937 22.6598Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.0588 24.2067L8.60559 25.7534L10.1524 24.2067L8.60559 22.6599L7.0588 24.2067Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8477 6.41845L26.3945 7.96524L27.9413 6.41845L26.3945 4.87165L24.8477 6.41845Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.65625 2.1875C7.95828 2.1875 8.20312 1.94266 8.20312 1.64062C8.20312 1.33859 7.95828 1.09375 7.65625 1.09375C7.35422 1.09375 7.10938 1.33859 7.10938 1.64062C7.10938 1.94266 7.35422 2.1875 7.65625 2.1875Z" fill="black"/>
<path d="M31.1719 28.4375C31.4739 28.4375 31.7188 28.1927 31.7188 27.8906C31.7188 27.5886 31.4739 27.3438 31.1719 27.3438C30.8698 27.3438 30.625 27.5886 30.625 27.8906C30.625 28.1927 30.8698 28.4375 31.1719 28.4375Z" fill="black"/>
<path d="M4.44556 4.375L2.83337 5.98719" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.83337 4.375L4.44556 5.98719" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M32.8125 33.3594C32.8125 32.7792 32.582 32.2228 32.1718 31.8126C31.7616 31.4023 31.2052 31.1719 30.625 31.1719H4.375C3.79484 31.1719 3.23844 31.4023 2.8282 31.8126C2.41797 32.2228 2.1875 32.7792 2.1875 33.3594V33.3594" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.49158 25.0124C11.4039 26.5957 13.7437 27.5749 16.2138 27.8255" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.97656 16.5195C5.21352 19.0104 6.19125 21.3733 7.78367 23.3034" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.78641 7.32101C6.21941 9.22019 5.24701 11.5392 4.99078 13.988" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.3045 2.78906C13.8194 3.02259 11.4609 3.99388 9.53204 5.57812" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M25.4685 5.57813C23.5806 4.02775 21.2804 3.0634 18.8513 2.80383" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M30.0235 14.1258C29.7871 11.5957 28.7867 9.19743 27.1551 7.24937" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.154 23.3756C28.8062 21.4032 29.8108 18.9698 30.0311 16.4062" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.7179 27.8327C21.1886 27.5955 23.5331 26.6295 25.4538 25.0573" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.10938 15.3125H27.8906" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 25.7031V4.92188" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.1527 22.6598L24.8473 7.96523" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8473 22.6598L10.1527 7.96523" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.92368 19.3452L27.0763 11.2798" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.5327 24.8888L13.4673 5.73617" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.5805 24.9353L21.4194 5.68969" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.1228 19.232L7.8772 11.393" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.8351 31.0226L17.5 14.7656L13.1698 31.004" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 16.4062C18.1041 16.4062 18.5938 15.9166 18.5938 15.3125C18.5938 14.7084 18.1041 14.2188 17.5 14.2188C16.8959 14.2188 16.4062 14.7084 16.4062 15.3125C16.4062 15.9166 16.8959 16.4062 17.5 16.4062Z" stroke={wheel ? "rgb(256,186,3)" : '#ebeffd'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>
                        WHEEL</Link>
                    <Link onClick={() => setRightMenu(false)} className='link' to='/classic'>
                    <svg fill={classic ? "rgb(256,186,3)" : '#ebeffd'} style={{marginRight:'7px'}} width="20" height="20" viewBox="0 0 20 20"  xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_24_2)">
<path d="M18.7765 15.5418L20 3.98111L14.3351 5.85932L9.95629 0.30661L5.58027 5.85579L0 3.97689L1.12604 15.5418H18.7765ZM6.4816 8.88579L9.95629 4.47945L13.4282 8.88226L17.0088 7.69515L16.4518 12.958H3.47055L2.95852 7.69946L6.4816 8.88579Z" fill={classic ? "rgb(256,186,3)" : '#ebeffd'}/>
<path d="M18.9205 17.1095H1.02087V19.6934H18.9205V17.1095Z"  />
</g>
<defs>
<clipPath id="clip0_24_2">
<rect width="20" height="20" fill= {classic ? "rgb(256,186,3)" : '#ebeffd'}/>
</clipPath>
</defs>
</svg>
                        CLASSIC</Link>
                </div>
                </div>
                   
            <Header style={rightMenu ? {display:'none'} : {display:'flex'}} hovered={hovered} setHovered={setHovered} isLeave={isLeave} setLeave={setLeave}/>
           
            
            {success && <Success>Промокод успешно активирован</Success>}
            {error && <ErrorDiv>Данный код уже не может быть использован</ErrorDiv>}
            {store.nullBalanceError && <ErrorDiv>Ставка должна быть больше нуля!</ErrorDiv>}
            {alreadyUsed && <ErrorDiv>Вы уже использовали этот промокод</ErrorDiv>}
            {limit && <ErrorDiv>Сегодня вы уже активировали обычный промокод</ErrorDiv>}
            {store.muteInfoWindowForAdmin && <Success>Пользователь успешно заблокирован!</Success>}
            {banChat && <BanChat>Вы забанены в чате навсегда!</BanChat>}
            {store.waitNextGameError && <ErrorDiv>Дождитесь следующей игры!</ErrorDiv>}
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
                {hiddenChat && <button className={clChat.showChatBtn}>
                    <svg id={clChat.chat__icon}  onClick={() => setHiddenChat(false)} width="8336" height="7525" viewBox="0 0 8336 7525" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4161 0.382812C1854.97 0.382812 0.677823 1564.51 0.677823 3494.14C0.677823 4327.6 348.866 5089.5 929.779 5689.48C725.921 6535.54 44.711 7289.72 36.5567 7298.12C-0.137604 7335.92 -10.3305 7394.44 12.0938 7444.82C32.4633 7495.22 77.6708 7524.88 130.674 7524.88C1211.12 7524.88 2007.79 6991.4 2423.66 6661.68C2955.8 6867.44 3549.28 6987.38 4175.21 6987.38C6481.23 6987.38 8335.53 5423.08 8335.53 3508.74C8335.53 1594.41 6467.04 0.382812 4161 0.382812ZM2058.82 4031.64C1769.34 4031.64 1536.95 3792.28 1536.95 3509.24C1536.95 3226.22 1769.34 2971.74 2058.82 2971.74C2348.29 2971.74 2580.69 3211.1 2580.69 3509.24C2580.69 3807.4 2362.16 4031.64 2058.82 4031.64ZM4161 4031.64C3871.53 4031.64 3653.81 3792.28 3653.81 3509.24C3653.81 3226.22 3886.21 2971.74 4161 2971.74C4435.79 2971.74 4668.19 3211.1 4668.19 3509.24C4668.19 3807.4 4451.29 4031.64 4161 4031.64ZM6233.82 4031.64C5944.35 4031.64 5711.94 3792.28 5711.94 3509.24C5711.94 3226.22 5944.35 2971.74 6233.82 2971.74C6523.29 2971.74 6755.69 3211.1 6755.69 3509.24C6755.69 3807.4 6537.16 4031.64 6233.82 4031.64Z" fill="#050502"/>
                        <path d="M6233.82 4031.64C5944.35 4031.64 5711.94 3792.28 5711.94 3509.24C5711.94 3226.22 5944.35 2971.74 6233.82 2971.74C6523.29 2971.74 6755.69 3211.1 6755.69 3509.24C6755.69 3807.4 6537.16 4031.64 6233.82 4031.64Z" fill="#FDFDF2"/>
                        <path d="M4161 4031.64C3871.53 4031.64 3653.81 3792.28 3653.81 3509.24C3653.81 3226.22 3886.21 2971.74 4161 2971.74C4435.79 2971.74 4668.19 3211.1 4668.19 3509.24C4668.19 3807.4 4451.29 4031.64 4161 4031.64Z" fill="white"/>
                        <path d="M2058.82 4031.64C1769.34 4031.64 1536.95 3792.28 1536.95 3509.24C1536.95 3226.22 1769.34 2971.74 2058.82 2971.74C2348.29 2971.74 2580.69 3211.1 2580.69 3509.24C2580.69 3807.4 2362.16 4031.64 2058.82 4031.64Z" fill="#FFFFFC"/>
                    </svg>
                </button>}
                <Outlet/>
            </div>   
            
            
                
               
        
    );
};

export default observer(Layout);