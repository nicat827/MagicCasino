import React, { useContext, useEffect, useState } from 'react';
import Span from '../UI/span/Span';
import '../styles/Profile.css';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import clButton from '../UI/Button/Button.module.css';
import { AuthContext } from '../context';
import Input from '../UI/input/Input';
import Modal from '../UI/Modal/Modal';
import Success from '../UI/Success/Success';
import ErrorDiv from '../UI/Error/ErrorDiv';
import { set } from 'mongoose';

const Profile = () => {

    const {store} = useContext(Context)
    const [minesHistory, setMinesHistory] = useState(false)
    const [exitLogo, setExitLogo] = useState(false)
    const [wheelHistory, setWheelHistory] = useState(false)
    const [jackpotHistory, setJackpotHistory] = useState(false)
    const [changeNicknameInput, setChangeNicknameInput] = useState('')
    const [activatePromo, setActivatePromo] = useState('')
    const [emptyInput, setEmptyInput] = useState(false)
    const {hiddenChat, setHiddenChat} = useContext(AuthContext)
    const [depModal, setDepModal] = useState(false)
    const [withdrawModal, setWithdrawModal] = useState(false)
    const [amountDep, setAmountDep] = useState('')
    const [amountWith, setAmountWith] = useState('')
    const [changeNicknameModal, setChangeNicknameModal] = useState(false)
    const {success, setSuccess} = useContext(AuthContext)
    const {error, setError} = useContext(AuthContext)
    const [emptyDepInput, setEmptyDepInput] = useState(false)
    const [emptyWithInput, setEmptyWithInput] = useState(false)
    const {limit, setLimit} = useContext(AuthContext)
    const {notFound, setNotFound} = useContext(AuthContext)
    const {alreadyUsed, setAlreadyUsed} = useContext(AuthContext)

   
    
    const activate = async  () => {
        const res = await store.usePromo(activatePromo)
        console.log(res)
        if (res) {
            if (res === 'Успешно') {
                setSuccess(true)
                setTimeout(() => setSuccess(false), 2900)
            }
            else if (res === 'Вы уже активировали этот промокод!') {
                
                setAlreadyUsed(true)
                setTimeout(() => setAlreadyUsed(false), 2900)
            }
            else if (res === 'Сегодня вы уже активировали обычный промокод!') {
                
                setLimit(true)
                setTimeout(() => setLimit(false), 2900)
            }
            else if (res.data === 'Закончился') {
                setError(true)
                setTimeout(() => setError(false), 2900)
            }
            else if (res.data === 'Не найден') {
                setNotFound(true)
                setTimeout(() => setNotFound(false), 2900)
            }
        }

    }

    
  

    useEffect(() => {
        if (emptyInput) {
            setEmptyInput(false)
        }
    }, [changeNicknameInput])

    useEffect(() => {
        if (emptyDepInput) {
            setEmptyDepInput(false)
        }
        if (emptyWithInput) {
            setEmptyWithInput(false)
        }
    }, [amountDep, amountWith])

    return (
        
        <div className='profile'>
            
            <Modal visible={changeNicknameModal} setVisible={setChangeNicknameModal}>
                <div className='modal__changeNickname'>
                    <span className='changeNickname__span'>Смена никнейма стоит 50р.</span>
                    
                    <span className='changeNickname__span'>Хотите сменить никнейм?</span>
                    <input placeholder='Придумай что-нибудь крутое' maxLength='20' className={ emptyInput ? 'emptyInput' : 'changeNickname__input'} value={changeNicknameInput}  onChange={(e) => setChangeNicknameInput(e.target.value)}></input>
                    {emptyInput && <span className='emptyInput__span'>Обязательное поле</span>}
                    <button className='yes__btn' onClick={() => {
                        if (changeNicknameInput.length > 0) {
                            store.changeNickname(changeNicknameInput)
                            setChangeNicknameModal(false)
                        }
                        else {
                            setEmptyInput(true)
                        }
                        }}>Да</button>
                    <button className='no__btn' onClick={() => setChangeNicknameModal(false)}>Нафиг оно надо!</button>
                    
                </div>
            </Modal>

            <Modal visible={depModal} setVisible={setDepModal}>
                <div className='modal__dep'>
                    <span className='changeNickname__span'>Введите сумму пополнения:</span>
                    <input type='number' placeholder='?' maxLength='20' className={ emptyDepInput ? 'emptyInput' : 'changeNickname__input'} value={amountDep}  onChange={(e) => setAmountDep(e.target.value)}></input>
                    {emptyDepInput && <span className='emptyInput__span'>Обязательное поле</span>}
                    <button className='yes__btn' onClick={() => {
                        if (amountDep && amountDep != 0) {
                            store.deposit(amountDep)
                            setDepModal(false)
                        }
                        else {
                            setEmptyDepInput(true)
                        }
                        
                        }}>Пополнить</button>
                    <button className='no__btn' onClick={() => setDepModal(false)}>Отмена</button>
                    
                </div>
            </Modal>
            <Modal visible={withdrawModal} setVisible={setWithdrawModal}>
                <div className='modal__dep'>
                    <span className='changeNickname__span'>Введите сумму вывода:</span>
                    <input placeholder='?' maxLength='20' className={ emptyWithInput ? 'emptyInput' : 'changeNickname__input'} value={amountWith}  onChange={(e) => setAmountWith(e.target.value)}></input>
                    {emptyWithInput && <span className='emptyInput__span'>Обязательное поле</span>}
                    <button className='yes__btn' onClick={() => {
                        if (amountWith && amountWith !== 0 ) {
                            store.withdraw(amountWith)
                            setWithdrawModal(false)
                        }
                        else {
                            setEmptyWithInput(true)
                        }
                        
                        }}>Вывести</button>
                    <button className='no__btn' onClick={() => setWithdrawModal(false)}>Отмена</button>
                    
                </div>
            </Modal>
            <div className='profile-left-container'>
        <div className='profile__item yandex__div'>
                <div className='div__user'>     
                    
                    <img className={exitLogo ? 'blur-user-icon' :'user-icon'} onClick={() => {
                        if (localStorage.getItem('token')) {
                            store.logout()
                           
                        }
    
                        if (localStorage.getItem('sid')) {
                            store.logoutVk();
   
                            
                        }
                    }} src={store.user.photo} onMouseEnter={() => setExitLogo(true)} onMouseLeave={() => setExitLogo(false)}></img>
                    {exitLogo ? <img onClick={() => {
                        if (localStorage.getItem('token')) {
                            store.logout()
                           
                        }
    
                        if (localStorage.getItem('sid')) {
                            store.logoutVk();
   
                            
                        }
                    }} className='logout-icon' onMouseEnter={() => setExitLogo(true)} onMouseLeave={() => setExitLogo(false)} src={require('../icons/exit.svg')}></img> : null}
                    
                    <div className='user-info'>{(localStorage.getItem('token')) ? store.user.email : `${store.user.name} ${store.user.surname}`}</div>
                <div className='depAndWithd__div'>
                    <Button className='dep__btn' onClick={() => setDepModal(true)}>Пополнить</Button>
                    <Button className='withd__btn' onClick={() => setWithdrawModal(true)}>Вывести</Button>
                </div>
                
                </div>

                    <Button className='change__nicknameBtn' onClick={() => setChangeNicknameModal(true)}>сменить никнейм</Button>
                
                
            </div>
            <div className='profile__item promo__div'>
                <Span disabled={true} className='promo__span'>Активация промокода</Span>
                <Input className='promo__input' placeholder='Забирай халяву' value={activatePromo} onChange={(e) => setActivatePromo(e.target.value)} />
                <Button className={!activatePromo  || success || limit || alreadyUsed || error || notFound ? 'disabled__activate__btn'  : 'activate__btn'} disabled={!activatePromo || limit || alreadyUsed || success || error || notFound ? true : false} onClick={activate}>Активировать!</Button>
            </div>
            </div>
                <div className='profile__item history__div' style={hiddenChat ? {width:'800px',  transform:'translateX(5%)', transitionDuration:'2s'} : {width:'600px', transform:'translateX(-5%)', transitionDuration:'2s'}}>
                    {minesHistory ? 
                    <div className='profile__item mines__history' >
                        <Span className='mines__span'>
                            Mines
                        </Span>
                    </div> : null }
                    {wheelHistory ? 
                    <div className='profile__item wheel__history' >
                        <Span className='wheel__span'>
                            Wheel
                        </Span>
                    </div> : null }
                    {jackpotHistory ? 
                    <div className='profile__item jackpot__history' >
                        <Span className='jackpot__span'>
                            Jackpot
                        </Span>
                    </div> : null }
                    <Span disabled={true} className='history__span'>
                        История игр
                    </Span>
                    <Button 
                    className={!minesHistory && !jackpotHistory && !wheelHistory ? 'disabled__back__btn' : 'back__btn'} 
                    disabled={!minesHistory && !jackpotHistory && !wheelHistory && true}  
                    onClick={() => {
                        setJackpotHistory(false)
                        setMinesHistory(false)
                        setWheelHistory(false)
                    }}>
                        Назад</Button>
                    {!minesHistory && !jackpotHistory && !wheelHistory && (
                    <div className='header__history' style={hiddenChat ? {left:'490px'} : {left:'440px', transitionDuration:'3s'}}>
                        <div className={minesHistory ? 'active' : 'mines'} onClick={() => {
                            setWheelHistory(false);
                            setJackpotHistory(false);
                            setMinesHistory(true);
                        }}>
                            Мины
                        </div>
                        <div  className={wheelHistory ? 'active' : 'wheel'} onClick={() => {
                            setJackpotHistory(false);
                            setMinesHistory(false);
                            setWheelHistory(true);
                            

                        }
                        }>
                            Колесо чудес
                        </div>
                        <div className={jackpotHistory ? 'active' : 'jackpot'} onClick={() => {
                             setWheelHistory(false);
                             setMinesHistory(false);
                             setJackpotHistory(true);
                        }}>
                            Джекпот
                        </div>
                    </div>
                    )}
                </div>
            </div>
        
    );
};

export default observer(Profile);