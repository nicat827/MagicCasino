import React, { useContext, useState } from 'react';
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

const Header = () => {
   
    const {modalLogin, setModalLogin} = useContext(AuthContext)
    const [loginModal, setLoginModal] = useState(true)
    
    const {store} = useContext(Context)
    const match = useMatch('/profile')



    return (
        <header className={cl.header}>

            <img src={require("../../icons/title.png")} className={cl.magic__title} />
            <CustomLink to='/mines'>Мины</CustomLink>
            <CustomLink to='/wheel'>Колесо чудес</CustomLink>
            <CustomLink to='/classic'>Джекпот</CustomLink>
            <Modal visible={modalLogin} setVisible={setModalLogin}>
                {loginModal
                    ? <Login loginModal={loginModal} setLoginModal={setLoginModal} />
                    : <Registration loginModal={loginModal} setLoginModal={setLoginModal}></Registration>
                }
               
            </Modal>          
            <div className={cl.header__end}>
                {store.isAuth

                ?       <>
                            <CustomLink to='/profile' style={{padding:'0px'}}>
                                <img className={match ? cl.userIcon__active : cl.userIcon} src={store.user.photo}></img>
                            </CustomLink> 
                            <Span className={clSpan.balance__span}>Баланс:</Span>
                        </>    
                : 
                    <Span className={clSpan.login__btn}  onClick={() => setModalLogin(true)}>Войти</Span>
                }

            </div>
            
            
            
        </header>
    );
};

export default observer(Header);