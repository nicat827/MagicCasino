import React, { useContext, useState } from 'react';
import Span from '../UI/span/Span';
import '../styles/Profile.css';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import Button from '../UI/Button/Button';
import clButton from '../UI/Button/Button.module.css';
import { AuthContext } from '../context';
import Input from '../UI/input/Input';

const Profile = () => {

    const {store} = useContext(Context)
    const [minesHistory, setMinesHistory] = useState(false)
    const [wheelHistory, setWheelHistory] = useState(false)
    const [jackpotHistory, setJackpotHistory] = useState(false)
    const [activatePromo, setActivatePromo] = useState('')
    const {hiddenChat, setHiddenChat} = useContext(AuthContext)

    return (
        <div className='profile'>

            <div className='grid'>
            <div className='grid__item yandex__div'>
                
                    <img className='user-icon' src={store.user.photo}></img>
                
                <Span style={{color:'#69116E', fontSize:'18px', borderBottom:'2px dashed #69116E', paddingBottom:'5px'}}>{(localStorage.getItem('token')) ? store.user.email : `${store.user.name} ${store.user.surname}`} </Span>
                <Button className={clButton.exit__btn} onClick={() => {
                    if (localStorage.getItem('token')) {
                        store.logout()
                       
                    }

                    if (localStorage.getItem('sid')) {
                        store.logoutVk();
                        
                        
                    }
                    
                }}>Выйти</Button>
            </div>
            <div className='grid__item promo__div'>
                <Span disabled={true} className='promo__span'>Активация промокода</Span>
                <Input className='promo__input' placeholder='Забирай халяву' value={activatePromo} onChange={(e) => setActivatePromo(e.target.value)} />
                <Button className={activatePromo ? 'activate__btn' : 'disabled__activate__btn'} disabled={activatePromo ? false : true}>Активировать!</Button>
            </div>
                <div className={'grid__item history__div'} style={hiddenChat ? {width:'800px',  transform:'translateX(5%)', transitionDuration:'3s'} : {width:'600px', transform:'translateX(-5%)', transitionDuration:'2s'}}>
                    {minesHistory ? 
                    <div className='grid__item mines__history' >
                        <Span className='mines__span'>
                            Mines
                        </Span>
                    </div> : null }
                    {wheelHistory ? 
                    <div className='grid__item wheel__history' >
                        <Span className='wheel__span'>
                            Wheel
                        </Span>
                    </div> : null }
                    {jackpotHistory ? 
                    <div className='grid__item jackpot__history' >
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
        </div>
    );
};

export default observer(Profile);