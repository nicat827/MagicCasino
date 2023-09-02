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
import panel from '../styles/AdminPanel.module.css'
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
    const [modalMines, setModalMines] = useState(false)
    const [gettedGame, setGettedGame] = useState([])
    const [gettedStatusForModal, setGettedStatusForModal] = useState(null)

   
    
    const activate = async  () => {
        const res = await store.usePromo(activatePromo)
        console.log(res)
        if (res) {
            if (res.info === 'Успешно') {
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
            else if (res === 'Закончился') {
                setError(true)
                setTimeout(() => setError(false), 2900)
            }
            else if (res === 'Не найден') {
                setNotFound(true)
                setTimeout(() => setNotFound(false), 2900)
            }
        }

    }

    
    const showModal = async (id) => {
        const res = await store.getGameMines(id)
        setGettedStatusForModal(res.status)
        let copy = []
        let i = 1
        while (i <= 25) {
            copy.push({id:i, click:res.click.includes(i) ? true : false, mines:res.mines.includes(i) ? true : false, status:res.status})
            i++
        }
        setGettedGame(copy)
        setModalMines(true)
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
     
        <>     
            <Modal visible={changeNicknameModal} setVisible={setChangeNicknameModal}>
                <div className='modal__changeNickname'>
                    <div className='changeNickname__span'>Смена никнейма стоит 50р.</div>
                    
                    <div className='changeNickname__span'>Хотите сменить никнейм?</div>
                    <input placeholder={emptyInput ? 'Обязательное поле' : '...'} maxLength='20' className={ emptyInput ? 'emptyInput' : 'changeNickname__input'} value={changeNicknameInput}  onChange={(e) => setChangeNicknameInput(e.target.value)}></input>
                    
                    <button className='yes__btn' onClick={() => {
                        if (changeNicknameInput.length > 0) {
                            store.changeNickname(changeNicknameInput)
                            setChangeNicknameModal(false)
                        }
                        else {
                            setEmptyInput(true)
                        }
                        }}>Да</button>
                    <button className='no__btn' onClick={() => setChangeNicknameModal(false)}>Нет</button>
                    
                </div>
            </Modal>
            <Modal  visible={modalMines} setVisible={setModalMines} isForMines={gettedStatusForModal === 'win' ? 'win' : 'lose'}>
                <div className='mines__panel'>
                    {gettedGame.map((obj) => 
                        <button className={obj.mines ? obj.click ? 'mines__item disabled lose' : 'mines__item disabled lose opacity' : obj.click ? 'mines__item disabled win' : 'mines__item disabled win opacity'}>
                        {
                            obj.mines 
                                ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                </svg>
                                : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.125 15.375H35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                        }
                        
                        </button>
                
                    )}
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
            <div className='profile-left-container' style={!hiddenChat && window.innerWidth > 1024 ? {width:'26vw'} : null}>
        <div className='profile__item yandex__div'>
                <div className='div__user'>     
                        <div className='avatar-div'>
                            <img className='user-icon' onClick={() => {
                            if (localStorage.getItem('token')) {
                                store.logout()
                           
                            }
    
                            if (localStorage.getItem('sid')) {
                                store.logoutVk();
   
                            
                            }
                        }} src={store.user.photo} />
                         <svg fill='white' onClick={() => store.logoutVk()} className='logout-icon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z"/></svg>
                        </div>   
                    <div className='user-info'>{(localStorage.getItem('token')) ? store.user.email : `${store.user.name} ${store.user.surname}`}
                        <svg className='changeNicknameIcon'  fill='white' xmlns="http://www.w3.org/2000/svg" onClick={() => setChangeNicknameModal(true)} height="20" width="20"><path d="M4.5 19.146q-.625 0-1.062-.438Q3 18.271 3 17.646v-11q0-.625.438-1.063.437-.437 1.062-.437h6.521l-1.5 1.5H4.5v11h11v-4.979l1.5-1.521v6.5q0 .625-.438 1.062-.437.438-1.062.438Zm5.5-7Zm3.625-6.813 1.083 1.084L9.5 11.583v1.063h1.062l5.188-5.167 1.042 1.063-5.604 5.604H8v-3.167Zm3.167 3.209-3.167-3.209 1.771-1.771q.437-.437 1.052-.437.614 0 1.052.437l1.083 1.084q.438.437.438 1.052 0 .614-.438 1.052Z"/></svg>
                    </div>
                <div className='depAndWithd__div'>
                    <Button className='dep__btn' onClick={() => setDepModal(true)}>Пополнить</Button>
                    <Button className='withd__btn' onClick={() => setWithdrawModal(true)}>Вывести</Button>
                </div>
                
                </div>
                
                    
                
                
            </div>
            <div className='profile__item promo__div'>
                <Span disabled={true} className='promo__span'>Активация промокода</Span>
                <Input className='promo__input' placeholder='Забирай халяву' value={activatePromo} onChange={(e) => setActivatePromo(e.target.value)} />
                <Button className={!activatePromo  || success || limit || alreadyUsed || error || notFound ? 'disabled__activate__btn'  : 'activate__btn'} disabled={!activatePromo || limit || alreadyUsed || success || error || notFound ? true : false} onClick={activate}>Активировать!</Button>
            </div>
            </div>
                <div className='profile__item history__div' style={!hiddenChat && window.innerWidth > 1024 ? {width:'45vw'} : null}>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                        <Span disabled={true} className='history__span'>
                            История игр
                        </Span>
                        {minesHistory && (<Span className='mines__span'>
                                Mines
                            </Span>)}
                    </div>
                    
                    
                    {minesHistory && 
                    <div className='minesHistory' >
                        
                        <table className='minesHistory__table'>
                            <tr>
                                <th className='th id'>ID</th>
                                <th className='th amount'>СУММА</th>
                                <th className='th statusHeader'>СТАТУС</th>
                            </tr>

                            <tr>
                                <td className='id'>{store.minesHistory[0].id}</td>
                                <td>{store.minesHistory[0].amount.toFixed(2)}</td>
                                <td className='status'>
                                    <div className='div__status'>
                                        {store.minesHistory[0].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[0].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[0].id)} className={store.minesHistory[0].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                   
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[1].id}</td>
                                <td>{store.minesHistory[1].amount.toFixed(2)}</td>
                                <td className='td status' >
                                     <div className='div__status'>
                                        {store.minesHistory[1].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[1].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[1].id)} className={store.minesHistory[1].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        
                            <tr>
                                <td className='id'>{store.minesHistory[2].id}</td>
                                <td>{store.minesHistory[2].amount}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                <div className='div__status'>
                                        {store.minesHistory[2].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[2].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[2].id)} className={store.minesHistory[2].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[3].id}</td>
                                <td>{store.minesHistory[3].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                    <div className='div__status'>
                                        {store.minesHistory[3].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[3].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[3].id)} className={store.minesHistory[3].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[4].id}</td>
                                <td>{store.minesHistory[4].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                    <div className='div__status'>
                                        {store.minesHistory[4].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[4].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[4].id)} className={store.minesHistory[4].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[5].id}</td>
                                <td>{store.minesHistory[5].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                    <div className='div__status'>
                                        {store.minesHistory[5].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[5].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[5].id)} className={store.minesHistory[5].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[6].id}</td>
                                <td>{store.minesHistory[6].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                    <div className='div__status'>
                                        {store.minesHistory[6].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[6].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[6].id)} className={store.minesHistory[6].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[7].id}</td>
                                <td>{store.minesHistory[7].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                    <div className='div__status'>
                                        {store.minesHistory[7].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[7].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[7].id)} className={store.minesHistory[7].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='id'>{store.minesHistory[8].id}</td>
                                <td>{store.minesHistory[8].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s'} : null}>
                                    <div className='div__status'>
                                        {store.minesHistory[8].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[8].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[8].id)} className={store.minesHistory[8].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='td id end'>{store.minesHistory[9].id}</td>
                                <td className='td amount end'>{store.minesHistory[9].amount.toFixed(2)}</td>
                                <td className='td status' style={hiddenChat ? {transition:'0.5s', borderBottom:'0px'} : {borderBottom:'0px'}}>
                                    <div className='div__status'>
                                        {store.minesHistory[9].status === 'lose' 
                                            ? <p style={{color:'red', marginLeft:'5px'}}>Проигрыш</p>
                                            : <p className='win_p'>Выигрыш {store.minesHistory[9].win}</p>}

                                        <div className='check__iconDiv'>
                                            <svg onClick={() => showModal(store.minesHistory[9].id)} className={store.minesHistory[9].status === 'lose' ? 'check__icon lose' : 'check__icon win'} xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10.95 15.55 16.6 9.9l-1.425-1.425L10.95 12.7l-2.1-2.1-1.425 1.425ZM12 22q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v6.1q0 3.8-2.262 6.912Q15.475 21.125 12 22Zm0-2.1q2.6-.825 4.3-3.3 1.7-2.475 1.7-5.5V6.375l-6-2.25-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3Zm0-7.9Z"/></svg>    
                                        </div>
                                    </div>
                                </td>
                                
                            </tr>
                        </table>
                    </div>
                       
                      
                      
                    }
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
                    <Button 
                    className={!minesHistory && !jackpotHistory && !wheelHistory ? 'disabled__back__btn' : 'back__btn'} 
                    disabled={!minesHistory && !jackpotHistory && !wheelHistory && true}  
                    onClick={() => {
                        setJackpotHistory(false)
                        setMinesHistory(false)
                        setWheelHistory(false)
                    }}>
                        Назад</Button>
                    
                </div>
            </>
        
    );
};

export default observer(Profile);