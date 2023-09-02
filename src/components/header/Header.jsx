import React, { useContext, useEffect, useRef, useState } from 'react';
import CustomLink from '../../UI/Links/CustomLink';
import Modal from '../../UI/Modal/Modal';
import cl from './Header.module.css';
import clLink from '../../UI/Links/CustomLink.module.css';
import clButton from '../../UI/Button/Button.module.css';
import Button from '../../UI/Button/Button';
import { AuthContext } from '../../context';
import { Link, useMatch } from 'react-router-dom';
import Login from '../Login.jsx'
import Registration from '../Registration.jsx'
import { Context } from '../..';
import {observer} from "mobx-react-lite";
import Span from '../../UI/span/Span';
import clSpan from '../../UI/span/Span.module.css';

const Header = ({hovered, setHovered, isLeave, setLeave}) => {
   
    const {modalLogin, setModalLogin, rightMenu, setRightMenu} = useContext(AuthContext)
    const [loginModal, setLoginModal] = useState(true)
    const [active, setActive] = useState(false);
    const {store} = useContext(Context)
    
    const match = useMatch('/profile')
    const mines = useMatch('/mines')
    const classic = useMatch('/classic')
    const wheel = useMatch('/wheel')


    return (
        <header className={cl.header}>
            <img src={require("../../icons/log4.png")} className={cl.magic__title} />
            <div className={cl.header__start}>
            
            <CustomLink className={mines ? cl.custom__linkActive : cl.custom__link}  to='/mines'>
                 
                 <svg width="35" height="35" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path  fill="black" d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z"/>
                </svg>

                
                
            <span className={cl.mines__tooltip}>Mines</span>
            </CustomLink>
            
            <CustomLink to='/wheel' className={wheel ? cl.custom__linkActive : cl.custom__link} > 
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.65625 2.1875C7.95828 2.1875 8.20312 1.94266 8.20312 1.64062C8.20312 1.33859 7.95828 1.09375 7.65625 1.09375C7.35422 1.09375 7.10938 1.33859 7.10938 1.64062C7.10938 1.94266 7.35422 2.1875 7.65625 2.1875Z" fill="black"/>
<path d="M31.1719 28.4375C31.4739 28.4375 31.7188 28.1927 31.7188 27.8906C31.7188 27.5886 31.4739 27.3438 31.1719 27.3438C30.8698 27.3438 30.625 27.5886 30.625 27.8906C30.625 28.1927 30.8698 28.4375 31.1719 28.4375Z" fill="black"/>
<path d="M4.44556 4.375L2.83337 5.98719" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.83337 4.375L4.44556 5.98719" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M32.8125 33.3594C32.8125 32.7792 32.582 32.2228 32.1718 31.8126C31.7616 31.4023 31.2052 31.1719 30.625 31.1719H4.375C3.79484 31.1719 3.23844 31.4023 2.8282 31.8126C2.41797 32.2228 2.1875 32.7792 2.1875 33.3594V33.3594" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.10938 15.3125H27.8906" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 25.7031V4.92188" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.1527 22.6598L24.8473 7.96523" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8473 22.6598L10.1527 7.96523" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.92368 19.3452L27.0763 11.2798" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.5327 24.8888L13.4673 5.73617" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.5805 24.9353L21.4194 5.68969" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.1228 19.232L7.8772 11.393" stroke="#B5A19C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 14.7656L13.125 31.1719H21.875L17.5 14.7656Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 16.4062C18.1041 16.4062 18.5938 15.9166 18.5938 15.3125C18.5938 14.7084 18.1041 14.2188 17.5 14.2188C16.8959 14.2188 16.4062 14.7084 16.4062 15.3125C16.4062 15.9166 16.8959 16.4062 17.5 16.4062Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.5938 1.64062H16.4062V3.82812H18.5938V1.64062Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.5938 26.7969H16.4062V28.9844H18.5938V26.7969Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.82812 14.2188V16.4062H6.01562V14.2188H3.82812Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M28.9844 14.2188V16.4062H31.1719V14.2188H28.9844Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M8.60621 4.87164L7.05942 6.41844L8.60621 7.96523L10.153 6.41844L8.60621 4.87164Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M26.3937 22.6598L24.8469 24.2066L26.3937 25.7534L27.9405 24.2066L26.3937 22.6598Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.0588 24.2067L8.60559 25.7534L10.1524 24.2067L8.60559 22.6599L7.0588 24.2067Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8477 6.41845L26.3945 7.96524L27.9413 6.41845L26.3945 4.87165L24.8477 6.41845Z" stroke="black" strokeWidth="2.02952" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.65625 2.1875C7.95828 2.1875 8.20312 1.94266 8.20312 1.64062C8.20312 1.33859 7.95828 1.09375 7.65625 1.09375C7.35422 1.09375 7.10938 1.33859 7.10938 1.64062C7.10938 1.94266 7.35422 2.1875 7.65625 2.1875Z" fill="black"/>
<path d="M31.1719 28.4375C31.4739 28.4375 31.7188 28.1927 31.7188 27.8906C31.7188 27.5886 31.4739 27.3438 31.1719 27.3438C30.8698 27.3438 30.625 27.5886 30.625 27.8906C30.625 28.1927 30.8698 28.4375 31.1719 28.4375Z" fill="black"/>
<path d="M4.44556 4.375L2.83337 5.98719" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M2.83337 4.375L4.44556 5.98719" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M32.8125 33.3594C32.8125 32.7792 32.582 32.2228 32.1718 31.8126C31.7616 31.4023 31.2052 31.1719 30.625 31.1719H4.375C3.79484 31.1719 3.23844 31.4023 2.8282 31.8126C2.41797 32.2228 2.1875 32.7792 2.1875 33.3594V33.3594" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.49158 25.0124C11.4039 26.5957 13.7437 27.5749 16.2138 27.8255" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M4.97656 16.5195C5.21352 19.0104 6.19125 21.3733 7.78367 23.3034" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.78641 7.32101C6.21941 9.22019 5.24701 11.5392 4.99078 13.988" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M16.3045 2.78906C13.8194 3.02259 11.4609 3.99388 9.53204 5.57812" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M25.4685 5.57813C23.5806 4.02775 21.2804 3.0634 18.8513 2.80383" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M30.0235 14.1258C29.7871 11.5957 28.7867 9.19743 27.1551 7.24937" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.154 23.3756C28.8062 21.4032 29.8108 18.9698 30.0311 16.4062" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M18.7179 27.8327C21.1886 27.5955 23.5331 26.6295 25.4538 25.0573" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.10938 15.3125H27.8906" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 25.7031V4.92188" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M10.1527 22.6598L24.8473 7.96523" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8473 22.6598L10.1527 7.96523" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M7.92368 19.3452L27.0763 11.2798" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.5327 24.8888L13.4673 5.73617" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.5805 24.9353L21.4194 5.68969" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M27.1228 19.232L7.8772 11.393" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M21.8351 31.0226L17.5 14.7656L13.1698 31.004" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M17.5 16.4062C18.1041 16.4062 18.5938 15.9166 18.5938 15.3125C18.5938 14.7084 18.1041 14.2188 17.5 14.2188C16.8959 14.2188 16.4062 14.7084 16.4062 15.3125C16.4062 15.9166 16.8959 16.4062 17.5 16.4062Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={cl.mines__tooltip}>Wheel</span> 
            </CustomLink>
           
            <CustomLink to='/classic' className={classic ? cl.custom__linkActive : cl.custom__link}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="35" height="35" viewBox="0 0 256 256" xmlSpace="preserve">

<defs>
</defs>
<g  transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 89.733 22.688 c -0.258 -0.277 -0.65 -0.385 -1.01 -0.281 c -10.733 3.09 -19.265 7.198 -25.839 12.441 c -2.889 -9.058 -7.303 -17.043 -13.152 -23.76 c 0.739 -0.987 1.183 -2.208 1.183 -3.534 c 0 -3.262 -2.653 -5.916 -5.915 -5.916 s -5.916 2.654 -5.916 5.916 c 0 1.326 0.444 2.547 1.183 3.534 c -5.849 6.718 -10.264 14.702 -13.152 23.759 c -6.574 -5.244 -15.106 -9.352 -25.839 -12.442 c -0.363 -0.104 -0.753 0.004 -1.01 0.281 s -0.335 0.675 -0.204 1.029 C 7.656 44.108 11.72 65.527 12.14 87.38 c 0.011 0.544 0.455 0.98 1 0.98 H 76.86 c 0.545 0 0.989 -0.437 1 -0.98 c 0.42 -21.853 4.483 -43.271 12.077 -63.663 C 90.069 23.363 89.99 22.965 89.733 22.688 z M 45 79.548 c -3.112 -2.973 -5.323 -6.66 -6.632 -11.062 c 1.309 -4.402 3.52 -8.089 6.632 -11.062 c 3.112 2.973 5.323 6.66 6.632 11.062 C 50.323 72.888 48.112 76.575 45 79.548 z"  transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
</g>
                </svg>
                <span className={cl.mines__tooltip}>Classic</span> 
            </CustomLink>
            
            <Modal visible={modalLogin} setVisible={setModalLogin}>
                {loginModal
                    ? <Login loginModal={loginModal} setLoginModal={setLoginModal} />
                    : <Registration loginModal={loginModal} setLoginModal={setLoginModal}></Registration>
                }
               
            </Modal>
            </div>
                      
            <div className={cl.header__end}>
                {store.isAuth

                ?       <>
                            {store.isAdmin && (
                                <CustomLink style={{padding:'0px', background:'none', color:'rgb(256,186,3)'}} to='/admin-panel827'>Панель</CustomLink>
                            )}
                            
                                <CustomLink className={cl.customLinkIcon} to='/profile' >
                                    <img className={cl.userIcon} src={store.user.photo}></img>
                                </CustomLink> 
                                <Span className={cl.balance__span}>{store.balance}р</Span>
                                <button className={cl.depBtn}>+</button>
                                <svg onClick={() => setRightMenu(true)} className={cl.menuIcon} xmlns="http://www.w3.org/2000/svg" height="28" width="28" fill='white'><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>
                            
                            
                           
                        </>    
                : 
                    <Span className={clSpan.login__btn}  onClick={() => setModalLogin(true)}>Войти</Span>
                }

            </div>
            
            
            
        </header>
    );
};

export default observer(Header);