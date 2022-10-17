import React, { useState } from 'react';
import Input from '../UI/input/Input';
import Button from '../UI/Button/Button';
import classes from '../UI/Button/Button.module.css'
import { AuthContext, ModalContext } from '../context';
import { useContext } from 'react';
import { useEffect } from 'react';
import Span from '../UI/span/Span';
import span from '../UI/span/Span.module.css';


import { Context } from '..';
import {observer} from "mobx-react-lite";
import input from '../UI/input/Input.module.css';

const Login = ({loginModal, setLoginModal}) => {

    const [emailError, setEmailError] = useState(false)

    const [incorrectPassword, setIncorrectPassword] = useState(false)
    const {setModalLogin} = useContext(AuthContext);
    
   
    const {store} = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)

    

    const registration = () => {
        setEmail('')
        setLoginModal(false);
                
    }

   

   

    return (
        
           
                    <div 
                        className='login__form'>
                        <Span>Ещё нет аккаунта? Тогда тебе
                            <Span className={span.reg__link} onClick={registration} >сюда</Span>
                        </Span>
                        <div className='yandex-div'>
                            <Input className={input.input__yandex} type='text' placeholder='Логин до @' value={email} onChange={(ev) => setEmail(ev.target.value)} maxLength='30' autoComplete='off' />
                            <Span disabled={true} style={{width:'35%'}} className={span.span__yandex} >@yandex.ru</Span>
                        </div>
                        <Input className={input.input__password} placeholder='Пароль' value={password} onChange={(ev) => setPassword(ev.target.value)} type='password' autoComplete='off'/>
                        {incorrectPassword && (
                        <Span style={{color:'red', marginTop:'5px'}}>
                            Введён неверный логин или пароль!
                        </Span>
                        )}
                        
                        <Button className={!email || !password ? classes.logBtn__disabled : classes.log__btn}  disabled={!email || !password ? true : false} onClick={() => {
                            if (email && password) {

                                const req = store.login(email+ '@yandex.ru', password)
                                req.then((req) => {  
                                    if(req==='OK') {
                                        setModalLogin(false)
                                    }
                                    else if (req==='Неверный пароль' || req==='Пользователь с таким email не найден') {
                                        setIncorrectPassword(true)
                                    }
                                   
                                    
                                })
                                

                            }
                            
                            
                            }}>Войти</Button>
                        <Button className={classes.vk__log__btn} onClick={() => {
                            
                            const req = store.authVk()
                            req.then((res) => {
                                if (res === 'OK') {
                                    setModalLogin(false)
                                }
                            })

                            
                        }}

                            >
                            Войти через
                            <svg id='icon__vk' width="25" height="25" viewBox="0 0 21 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path  fillRule="evenodd" clipRule="evenodd" d="M20.2394 1.70117C20.3795 1.20251 20.2394 0.83609 19.5721 0.83609H17.3658C16.8048 0.83609 16.5462 1.15262 16.406 1.50166C16.406 1.50166 15.284 4.41879 13.6945 6.31365C13.1803 6.86216 12.9465 7.03668 12.666 7.03668C12.5258 7.03668 12.3228 6.86215 12.3228 6.36354V1.70117C12.3228 1.10278 12.16 0.83609 11.6925 0.83609H8.22542C7.87485 0.83609 7.66401 1.11382 7.66401 1.37703C7.66401 1.94429 8.45869 2.07511 8.5406 3.67082V7.13645C8.5406 7.89628 8.41196 8.03404 8.13146 8.03404C7.38351 8.03404 5.56413 5.10388 4.48506 1.75101C4.27359 1.09933 4.06149 0.83609 3.49761 0.83609H1.29131C0.660932 0.83609 0.534851 1.15262 0.534851 1.50166C0.534851 2.125 1.28284 5.21664 4.0176 9.30557C5.84077 12.098 8.40948 13.6117 10.7469 13.6117C12.1493 13.6117 12.3228 13.2755 12.3228 12.6964V10.5859C12.3228 9.91347 12.4557 9.77928 12.8998 9.77928C13.227 9.77928 13.788 9.9538 15.097 11.3002C16.5929 12.8958 16.8396 13.6117 17.681 13.6117H19.8873C20.5177 13.6117 20.8329 13.2755 20.6511 12.612C20.4521 11.9507 19.7379 10.9914 18.7901 9.85407C18.2759 9.20583 17.5046 8.50775 17.2708 8.15863C16.9436 7.7099 17.0371 7.51039 17.2708 7.11151C17.2708 7.11151 19.9589 3.07243 20.2394 1.70117Z" fill="black"/>
                            </svg>
                        </Button>
                        
                    </div> 
                    
                
                
              
        
    );
};

export default observer(Login);
