import React from 'react';
import Button from '../UI/Button/Button';
import Input from '../UI/input/Input';
import classes from '../UI/Button/Button.module.css'
import Span from '../UI/span/Span';
import span from '../UI/span/Span.module.css';
import input from '../UI/input/Input.module.css';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { useState } from 'react';
import { useEffect } from 'react';
import Modal from '../UI/Modal/Modal';
import { Context } from '..';
import {observer} from "mobx-react-lite";
import ErrorDiv from '../UI/Error/ErrorDiv';

const Registration = ({setLoginModal}) => {

   
    const [registrateModal, setRegistrateModal] = useState(false)
    const {isAuth, setAuth} = useContext(AuthContext)
    
    const {modalLogin, setModalLogin} = useContext(AuthContext)
    const {email, setEmail} = useContext(AuthContext)
    const [disabled, setDisabled] = useState(false)
    
    const {store} = useContext(Context)
    const [password, setPassword]  = useState('')
   
    
    const [error, setError] = useState('')
    const {errorDiv, setErrorDiv}= useContext(AuthContext)

    const login = () => {
        setLoginModal(true)
        setEmail('')
        
    } 

    const messages = []
   

    
    

    return (
        <>
        <div>
       
            
            <Span>
                Уже есть аккаунт?
            <Span className={span.reg__link} onClick={login}>Залогинься : /</Span> 
            </Span>
            <div className='yandex__div'>
                <Input className={input.input__yandex} type='text' value={email} onChange={(ev) => setEmail(ev.target.value)} placeholder='Логин до @'  maxLength='29' autoComplete='off'></Input>
                <Span disabled={true} style={{width:'35%'}} className={span.span__yandex} >@yandex.ru</Span>
            </div>
            
            <Input  value={password} onChange={(ev) => setPassword(ev.target.value)} type='password' placeholder='Придумай пароль'  autoComplete='off' className={input.input__password}></Input>
            
            {password.length < 5 && (
                <>
                <br/>
                <Span style={{color:'red', marginTop:'5px'}}>
                    Короткий пароль
                </Span>
                </>
            )}
           
            <Button className={classes.log__btn} style={password.length >= 5 && email ? {width:'100%'} : {cursor:'not-allowed', width:'100%'}} disabled={ errorDiv || !email || password.length < 5 && true} onClick={() => {
                
                if (email && password.length >= 5) {
                    const req = store.registration(email+'@yandex.ru', password, messages)
                    req.then((req) =>{
                    
                        if (req==='OK'){
                            setModalLogin(false)
                            
                        }
                        else if (req === `Пользователь с почтовым адресом ${email+'@yandex.ru'} уже существует`) {
                            console.log('fef')
                            setErrorDiv(true)
                            setTimeout(() => setErrorDiv(false), 2900)
                        }
                    
                    })

                }

               


                
                

               
                }}>Хоба!</Button>
           
            </div>
                   
         </>       
    );
};

export default observer(Registration);