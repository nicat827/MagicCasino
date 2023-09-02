import React, { useEffect, useRef, useState, useMemo , useContext} from 'react';
import { Context } from '..';
import registerServiceWorker from 'react-service-worker';


import '../styles/Jackpot.css'
import { observer } from 'mobx-react-lite';
import { AuthContext } from '../context';
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'worker-timers';

import socket from '../socket'


const Jackpot = () => {
    const [betsCloseTime, setBetsCloseTime] = useState(null)
    const [winBilet, setWinBilet] = useState(null)
    const [delayForRedBlock, setDelayForRedBlock] = useState(0)
    const [cells, setCells] = useState([])
    const [start, setStart] = useState(null)
    const [winUser, setWinUser] = useState({})
    const [checkDelayStarted, setCheckDelayStarted] = useState(false)
    const [randomTranslate, setRandomTranslate] = useState(0)
    const [delay, setDelay] = useState(0)
    const [timerEnded, setTimerEnded] = useState(false)
    const [low, setLow] = useState(true)
    const [timerTranslate, setTimerTranslate] = useState(false)
    const [middle, setMiddle] = useState(false)
    const [animationWin, setAnimationWin] = useState(false)
    const [isStart, setIsStart] = useState(false)
    const [second, setSecond] = useState(25)
    const [scrollEndTime, setScrollEndTime] = useState(null)
    const [delayForTimer, setDelayForTimer] = useState(0)
    const [chanceMassive, setChanceMassive] = useState([])
    const [kd, setKd] = useState(false)
    const [chanceMassiveUpdated, setChanceMassiveUpdated] = useState([])
    const [high, setHigh] = useState(false)
    const [amount, setAmount] = useState(1)
    const {cardsRef} = useRef(null)
    const {store} = useContext(Context)
    const {hiddenChat} = useContext(AuthContext)
    const [isScrollStart, setScrollStart] = useState(false)
    const [players, setPlayers] = useState([])
    const [totalBets, setTotalBets] = useState(0)
    const [lastWinner, setLastWinner] = useState({})
    const [status, setStatus] = useState('wait')
    const {sliderDiv} = useRef(null)

   


    useEffect(() => {
        
        const res = store.checkGameJackpot() 

        res.then((data) => {
            console.log(data)
            if (data && data.status !== 'ended') {
                if (data.lastWinner) {
                    setLastWinner(data.lastWinner)
                }
                
                setPlayers(data.betters)
                setChanceMassive(data.chanceMassive)
                setTotalBets(data.totalBets)
                
                if (data.status === 'time') {
                    
                    setBetsCloseTime(data.betsCloseTime)
                    const current = Date.now()
                    const delta = data.betsCloseTime - current
                    const timer = (delta / 1000).toFixed(2)
                    setSecond(timer)
                    setDelayForTimer((((data.betsCloseTime - 25000) - current) / 1000).toFixed(0))
                    setStatus(data.status)
                }
                else if (data.status === 'play') {
                    setScrollEndTime(data.endTime)

                    const current = Date.now()
                    setDelay((((data.endTime - 19000) - current) / 1000).toFixed(0))
                    setDelayForRedBlock((((data.endTime - 19000) - current) / 1000).toFixed(0))
                    setSecond('ROLLING')
                    setWinBilet(data.winBilet)
                    setWinUser(data.winUser)
                    setStatus(data.status)
                    
                }
            }   
            
            
            else if (data.status == 'ended') {
                
                setLastWinner(data.lastWinner)
                setStatus('ended')
            }

            else {
                setStatus('ended')
            }
            
            
        }) 
    }, [])

    const checkDelayForTimerFunction = () => {

        if (!checkDelayStarted) {
            setCheckDelayStarted(true)
        }
        if (Date.now() - betsCloseTime <= 0) {
            const current = Date.now()
            setDelayForTimer((((betsCloseTime - 25000) - current) / 1000).toFixed(0))
            setTimeout(() => checkDelayForTimerFunction(), 2000)
        }
        else {
            setCheckDelayStarted(false)
        }
        


    }
    useEffect(() => {
        socket.on('error', () => {
            store.setError(true)
            setTimeout(() => store.setError(false), 2900)
        })
        socket.on('get_bet', (data) => {
            if (data) {
                setStatus(data.status)
                setBetsCloseTime(data.betsCloseTime)
                setPlayers(data.betters)
                setChanceMassive(data.chanceMassive)
                setTotalBets(data.totalBets)
            }
        })
        socket.on('get-bet-for-better', (data) => {
            if (data) {
                store.setBalance((data.balance).toFixed(2))
            }
        })

        socket.on('end-game', (data) => {
            if (data) {
                setLastWinner(data.winner) 
                setStatus(data.status)    
            }
        }) 
        socket.on('end-game-to-winner', (data) => {
            if (data) {   
                store.setBalance((data.balance).toFixed(2)) 
                setStatus(data.status)
                
            }
        }) 

        socket.on('play', (data) => {            
            if (data) {
                setStatus(data.status)
                setWinBilet(data.winBilet)
                setScrollEndTime(data.endTime)
                setWinUser(data.winUser)
            }      
        });
        return () => {
            socket.off('get_bet')
            socket.off('play')
            socket.off('end-game')
            socket.off('end-game-to-winner')
            socket.off('get-bet-for-better')
            socket.off('error')
        } 
    }, [])

    
    useEffect(() => {
        
        const cl = chanceMassive && chanceMassive.map((obj)=> {
            const chance = (Number(obj.amount) * 100) / totalBets
            if (chance == 100) {
                obj.chance = 100
                obj.count = 85
            }
            else {
                obj.chance = Number(chance.toFixed(1))
                
                if (Number(obj.chance) < 1) {
                    obj.count = Math.ceil(chance)
                }
                else {
                    obj.count = Math.floor(chance)
                }
            }
            
            return obj
        })
        setChanceMassiveUpdated(cl)

       
    }, [chanceMassive])
   
    useEffect(() => {
        if (status == 'play') {
            const arr = []
            chanceMassiveUpdated && chanceMassiveUpdated.map((obj) => {
            const a = new Array(obj.count).fill(undefined).map(() => {

                return (<img src={obj.photo} className='slider__photo' />)
            })

            arr.push(...a)
            
        })
        const shakeArr = arr.sort(() => Math.random() - 0.5)
        shakeArr[85] = (<img src={winUser.photo} className='slider__photo'/>)
        setCells(shakeArr)
        randomTranslateFunction()
        
        
        }
        
    }, [status, chanceMassiveUpdated])

    const randomTranslateFunction = () => {
        const width = document.querySelector('.slider__div')
        if (width) {
            const minTranslate = 5701 - (width.offsetWidth / 2)
            const maxTranslate = 5762 - (width.offsetWidth / 2)
            const randomTranslate = Math.floor(Math.random() * (maxTranslate - minTranslate) + minTranslate)
            setRandomTranslate(randomTranslate)
        }      
    }

    const startTimer = () => {
        if (!isStart) {
            setIsStart(true)
        }
        const current = Date.now()
        let delta = betsCloseTime - current
        if (delta < 0.03 && !timerEnded) {
            setTimerEnded(true)
            setSecond('ROLLING')
            
           
        }
        else if (delta > 0 && !timerEnded) {
            
            const timer = (delta / 1000).toFixed(2)
            setSecond(timer);
            setTimeout(() => startTimer(), 10)
            
            
        }
        
 
    }

    const startAnimation = () => {
        
        if (!isScrollStart) {
            setScrollStart(true)
        }
        const current = Date.now()
        
        const delta = scrollEndTime - current
        if (delta > -1000) {
            setTimeout(() => startAnimation(), 1000)
        }
        else {
            setAnimationWin(true)
        }

    }

    useEffect(() => {
        
        if (status === 'time' && !isStart && !checkDelayStarted) {
            console.log('278')
            startTimer()
            checkDelayForTimerFunction()
            
            
        }
        if (status === 'ended') {
            
            
            if (animationWin) {
                setTimeout(() => {
                    setAnimationWin(false)
                    setChanceMassive([])
                    setTotalBets(0)
                    setSecond(25)  
                    setChanceMassiveUpdated([])
                    setCells([])
                    setCheckDelayStarted(false)
                    setIsStart(false)
                    setDelayForRedBlock(0)
                    setScrollStart(false)
                    setTimerEnded(false)
                    setPlayers([])
                    setWinBilet(null)
                    setDelayForTimer(0)
                    setDelay(0)
                    setScrollEndTime(null)
                    
                }, 800)
            }
            else {
                setChanceMassive([])
                setDelay(0)
                setDelayForRedBlock(0)
                setCheckDelayStarted(false)
                setScrollStart(false)
                setTotalBets(0)
                setWinBilet(null)
                setSecond(25)
                setChanceMassiveUpdated([])
                setCells([])
                setDelayForTimer(0)
                setIsStart(false)
                setTimerEnded(false)
                setPlayers([])
                setScrollEndTime(null)
            }
            
            
        }

        if (status == 'play' && !isScrollStart) {
            startAnimation()

        }
    }, [status, second])

   
    
    
    const bet = async (amount) => {
        
        if ( Number(second) <= 3.50) {
            store.setWaitNextGameError(true)
            setTimeout(() => store.setWaitNextGameError(false), 2900)
        }
        else {
            if (amount == 0 ) {
                store.setNullBalanceError(true)
                setTimeout(() => store.setNullBalanceError(false), 2900)
            }

            else if (store.balance < amount) {
                store.setError(true)
                setTimeout(() => store.setError(false), 2900)
            }
            else {
                socket.emit('bet', {amount, id:store.id})
                setKd(true) 
                setTimeout(() => setKd(false), 1000) 
            }
        }
        
    }   
   
            
    return (
        <>
        {window.innerWidth > 827 
        ?
        (
        <>
        <div className={hiddenChat ? 'left-container' : 'left-container__mini'}>
            <div className='info__gameDiv'>
                {low && <h3 >
                    {totalBets}Р
                    <span className='info__gameSpan'>LOW</span>
                    </h3>}
                {middle && <h3 >
                    {totalBets}Р
                    <span className='info__gameSpan'>MIDDLE</span>
                    </h3>}
                {high && <h3 >
                    {totalBets}Р
                    <span className='info__gameSpan'>HIGH</span>
                    </h3>}
            </div>
            <div className="type__btnsDiv">
                <button className='type__btns' onClick={() => {
                    setMiddle(false)
                    setHigh(false)
                    setLow(true)}}>Low</button>
                <button className='type__btns' onClick={() => {
                    setLow(false)
                    setHigh(false)
                    setMiddle(true)
                    }}>Middle</button>
                <button className='type__btns'onClick={() => {
                    setLow(false)
                    setMiddle(false)
                    setHigh(true)
                    }}>High</button>
            </div>
        </div>
        <div className={hiddenChat ? 'center-div' : 'center-divMini'}>
            <div className='time__div'>
                <svg style={{marginRight:'5px', zIndex:'2'}}  xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path style={{fill:'white'}}  d="M15 4.458V1.667h10v2.791Zm3.625 18.5h2.75V13.25h-2.75ZM20 36.625q-3.083 0-5.813-1.187-2.729-1.188-4.77-3.23-2.042-2.041-3.229-4.77Q5 24.708 5 21.625q0-3.083 1.188-5.812 1.187-2.73 3.229-4.771 2.041-2.042 4.77-3.23Q16.917 6.625 20 6.625q2.708 0 5.125.896t4.417 2.521l2.166-2.167 2 1.958-2.208 2.209q1.542 1.791 2.521 4.166.979 2.375.979 5.417 0 3.083-1.188 5.813-1.187 2.729-3.229 4.77-2.041 2.042-4.771 3.23-2.729 1.187-5.812 1.187Z"/></svg>
                <h3 style={{zIndex:'2', transition:'0.5s all'}}>{second}</h3>
                <div className={status =='time' ? 'animationTimer__divTime' : status !== 'play' ? 'animationTimer__divWait' : null} style={status == 'time' ? {transform:`translate3d(100%,0,0)`, transition:`transform 25s  cubic-bezier(.44,.52,.8,.76) ${delayForTimer < -25 ? -25 : delayForTimer}s`} : null}></div>
                <div className='animationTimer__divPlay'  style={status == 'play' ?  {transform:`translate3d(-100%,0,0)`, transition:`transform 19s  cubic-bezier(.44,.52,.8,.76) ${delayForRedBlock < -19 ? -19 : delayForRedBlock}s`} : null}></div>
                
            </div>
            <div className='game__div'>
                       
                        <div className='procent__div'>
                            {chanceMassiveUpdated.length >= 1 ? chanceMassiveUpdated.map((obj, key) =>
                                <div key={key}  className='user__chanceDiv'>
                                    <img className='chance__photo' src={obj.photo}/>
                                    <div className='chance__span'>{obj.chance}%</div>  
                                </div>  
                               )
                            : <p className='wait_p'>Ожидание ставок...</p>
                            } 
                            
                        </div>
                        <div className='bg-slider__div'>
                            <div className={scrollEndTime ? 'slider__div' : 'slider__div hiddenSlider'}>
                                <div className={animationWin ? 'line blur' : 'line'} ref={cardsRef}></div>
                                {animationWin && <p  className='winBilet__span'>БИЛЕТ #{winBilet}</p>}
                                <div  className={animationWin ? 'cards__div blur' : 'cards__div'} style={winBilet ? {transform: `translate3d(-${randomTranslate}px,0px,0px)`, transition: `transform 19000ms cubic-bezier(.51,.61,.44,1.01)  ${delay < -19 ? -18 : delay}s`} : null}>
                                {cells}
                                </div>                    
                            </div>
                        </div>       
                        <div className='control__panelJackpot' >
                        <button className="control__btns" onClick={() => setAmount(0)}>
                            <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
                        </button>
                        <button className="control__btns" onClick={() => {
                            if (amount > 100) {
                                setAmount(amount - 100)
                            }
                            } }>
                            -100
                        </button>
                        <button className="control__btns" onClick={() => {
                            if (amount > 2) {
                                setAmount(amount/2)
                            }
                        }}>
                            x/2
                        </button>
                        <input type='number' className='control__btns' value={Number(amount.toFixed(2))} onChange={(e) => setAmount(Number(e.target.value))} style={{width:'17%', textAlign:'center'}}></input>
                        <button className="control__btns" onClick={() => {
                            if (amount > 0 && amount < 10000) {
                                setAmount(amount*2)
                            }
                        }}>
                            x*2
                        </button>
                        <button className="control__btns" onClick={() => setAmount(amount+100)}>
                            +100
                        </button>
                        <button className={store.error || store.nullBalanceError || !store.isAuth || status === 'play' || store.waitNextGameError || kd || Number(second) <= 3 ? 'start__btn disabled' : 'start__btn'} onClick={() => bet(amount)} disabled={store.error || store.nullBalanceError || store.waitNextGameError || !store.isAuth || status === 'play' || kd || Number(second) <= 2.50  ? true : false}>Поставить</button>
                    </div>    
                    </div>
            <div className='lastWinner__div'>
                <div className='lastWinner__leftSide'>
                    
                    <p className='lastWinner__text'>LAST WINNER</p>
                    <img src={lastWinner.photo} className='lastWinner__photo' />
                    
                </div>

                <div className='lastWinner__rightSide'>
                <div>
                    <p className='lastWinner__chance'>{lastWinner.chance && lastWinner.chance[lastWinner.chance.length -1] == '0' ? Number(lastWinner.chance).toFixed(0) : lastWinner.chance}%</p>
                    <div style={{display:'flex', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                    <svg className='coinIcon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 11q-3.75 0-6.375-1.175T3 7q0-1.65 2.625-2.825Q8.25 3 12 3t6.375 1.175Q21 5.35 21 7q0 1.65-2.625 2.825Q15.75 11 12 11Zm0 5q-3.75 0-6.375-1.175T3 12V9.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.687 1.537.213 2.562.213t2.562-.213q1.538-.212 2.963-.687 1.425-.475 2.45-1.237Q21 10.6 21 9.5V12q0 1.65-2.625 2.825Q15.75 16 12 16Zm0 5q-3.75 0-6.375-1.175T3 17v-2.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.688 1.537.212 2.562.212t2.562-.212q1.538-.213 2.963-.688t2.45-1.237Q21 15.6 21 14.5V17q0 1.65-2.625 2.825Q15.75 21 12 21Z"/></svg>
                        <p className='lastWinner__bet'>{lastWinner.totalBets}р</p>
                    </div>
                        
                   
                    
                </div>
                
                    <div>     
                        <p className='lastWinner__p'>{lastWinner.name}</p>
                        <p className='lastWinner__p'>{lastWinner.surname}</p>
                    </div>
                </div>  
                
            </div>         
        </div>
            
            
                   
                         
                    
                    <div className={hiddenChat ? 'betInfo__div' : 'betInfo__divMini'}>
                        {players && players.map((obj) => 
                        <>
                        
                            <div  className={hiddenChat ? 'playerBox' : 'playerBoxMini'}  key={obj.bilets.min}>
                                    <div className='playerBetsDiv'>
                                        <svg className='coinIcon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 11q-3.75 0-6.375-1.175T3 7q0-1.65 2.625-2.825Q8.25 3 12 3t6.375 1.175Q21 5.35 21 7q0 1.65-2.625 2.825Q15.75 11 12 11Zm0 5q-3.75 0-6.375-1.175T3 12V9.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.687 1.537.213 2.562.213t2.562-.213q1.538-.212 2.963-.687 1.425-.475 2.45-1.237Q21 10.6 21 9.5V12q0 1.65-2.625 2.825Q15.75 16 12 16Zm0 5q-3.75 0-6.375-1.175T3 17v-2.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.688 1.537.212 2.562.212t2.562-.212q1.538-.213 2.963-.688t2.45-1.237Q21 15.6 21 14.5V17q0 1.65-2.625 2.825Q15.75 21 12 21Z"/></svg>
                                        {obj.amount}
                                    </div>
                                    <img src={obj.photo} className='playerImg' />
                                    <h3 className='playerInfo'>{obj.name} {obj.surname}</h3>
                                    <div className='ticketDiv'>
                                        <svg className='ticketIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="m4.906 11.541 3.551 3.553 6.518-6.518-3.553-3.551-6.516 6.516zm14.198-4.877-1.511-1.512a2.024 2.024 0 0 1-2.747-2.746L13.335.894a1.017 1.017 0 0 0-1.432 0L.893 11.904a1.017 1.017 0 0 0 0 1.432l1.512 1.51a2.024 2.024 0 0 1 2.747 2.748l1.512 1.51a1.015 1.015 0 0 0 1.432 0L19.104 8.096a1.015 1.015 0 0 0 0-1.432zM8.457 16.719l-5.176-5.178L11.423 3.4l5.176 5.176-8.142 8.143z"/></svg>
                                            {obj.bilets.min} - {obj.bilets.max}
                                    </div>   
                            </div>
                            
                        </>
                        )}
                    </div> 
                </>)

                          
        : <>  
         <div className='mobile-top-container'>
                <div className='info__gameDiv'>
                    {low && <h3 >
                        {totalBets}Р
                        <span className='info__gameSpan'>LOW</span>
                        </h3>}
                    {middle && <h3 >
                        {totalBets}Р
                        <span className='info__gameSpan'>MIDDLE</span>
                        </h3>}
                    {high && <h3 >
                        {totalBets}Р
                        <span className='info__gameSpan'>HIGH</span>
                        </h3>}
                </div> 

                <div className='time__div'>
                    <svg style={{marginRight:'5px', zIndex:'2'}}  xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path style={{fill:'white'}}  d="M15 4.458V1.667h10v2.791Zm3.625 18.5h2.75V13.25h-2.75ZM20 36.625q-3.083 0-5.813-1.187-2.729-1.188-4.77-3.23-2.042-2.041-3.229-4.77Q5 24.708 5 21.625q0-3.083 1.188-5.812 1.187-2.73 3.229-4.771 2.041-2.042 4.77-3.23Q16.917 6.625 20 6.625q2.708 0 5.125.896t4.417 2.521l2.166-2.167 2 1.958-2.208 2.209q1.542 1.791 2.521 4.166.979 2.375.979 5.417 0 3.083-1.188 5.813-1.187 2.729-3.229 4.77-2.041 2.042-4.771 3.23-2.729 1.187-5.812 1.187Z"/></svg>
                    <h3 style={{zIndex:'2'}}>{second}</h3>
                    <div className={status =='time' ? 'animationTimer__divTime' : status !== 'play' ? 'animationTimer__divWait' : null} style={status == 'time' ? {transform:`translate3d(100%,0,0)`, transition:`transform 25s  cubic-bezier(.44,.52,.8,.76) ${delayForTimer < -25 ? -25 : delayForTimer}s`} : null}></div>
                <div className='animationTimer__divPlay'  style={status == 'play' ?  {transform:`translate3d(-100%,0,0)`, transition:`transform 19s  cubic-bezier(.44,.52,.8,.76) ${delayForRedBlock < -19 ? -19 : delayForRedBlock}s`} : null}></div>
                </div>
                {window.innerWidth > 450 && (
                    <div className="type__btnsDiv">
                        <button className='type__btns' onClick={() => {
                            setMiddle(false)
                            setHigh(false)
                            setLow(true)}}>Low</button>
                        <button className='type__btns' onClick={() => {
                            setLow(false)
                            setHigh(false)
                            setMiddle(true)
                            }}>Middle</button>
                        <button className='type__btns'onClick={() => {
                            setLow(false)
                            setMiddle(false)
                            setHigh(true)
                            }}>High</button>
                    </div>   
                )}       
            </div> 
            {window.innerWidth <= 450 && (
                    <div className="type__btnsDiv">
                        <button className='type__btns' onClick={() => {
                            setMiddle(false)
                            setHigh(false)
                            setLow(true)}}>Low</button>
                        <button className='type__btns' onClick={() => {
                            setLow(false)
                            setHigh(false)
                            setMiddle(true)
                            }}>Middle</button>
                        <button className='type__btns'onClick={() => {
                            setLow(false)
                            setMiddle(false)
                            setHigh(true)
                            }}>High</button>
                    </div>   
                )}
            <div className='game__div'>
                       
                       <div className='procent__div'>
                           {chanceMassiveUpdated.length >= 1 ? chanceMassiveUpdated.map((obj, key) =>
                               <div className='user__chanceDiv'>
                                   <img className='chance__photo' src={obj.photo}/>
                                   <div className='chance__span'>{obj.chance}%</div>  
                               </div>  
                              )
                           : <p className='wait_p'>Ожидание ставок...</p>
                           } 
                           
                       </div> 
                       <div className={status === 'play' ? 'slider__div' : 'slider__div hiddenSlider'}  ref={sliderDiv}>
                            <div className={animationWin ? 'line blur' : 'line'}></div>
                           {animationWin && <p  className='winBilet__span'>БИЛЕТ #{winBilet}</p>}
                           <div  className={animationWin ? 'cards__div blur' : 'cards__div'} style={winBilet ? {transform: `translate3d(-${randomTranslate}px,0px,0px)`, transition: `transform 18000ms  cubic-bezier(0.390, 0.575, 0.565, 1.000) ${delay < -19 ? -18 : delay}s`} : null}>
                           
                            {cells}
                           </div>
                               
                       </div>
                      
                       <div className='control__panelJackpot' >
                       <button className="control__btns" onClick={() => setAmount(0)}>
                           <svg fill='white' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/></svg>
                       </button>
                       <button className="control__btns" onClick={() => {
                           if (amount > 100) {
                               setAmount(amount - 100)
                           }
                           } }>
                           -100
                       </button>
                       <button className="control__btns" onClick={() => {
                           if (amount > 2) {
                               setAmount(amount/2)
                           }
                       }}>
                           x/2
                       </button>
                       <input type='number' className='control__btns' value={Number(amount.toFixed(2))} onChange={(e) => setAmount(Number(e.target.value))} style={{width:'17%', textAlign:'center'}}></input>
                       <button className="control__btns" onClick={() => {
                           if (amount > 0 && amount < 10000) {
                               setAmount(amount*2)
                           }
                       }}>
                           x*2
                       </button>
                       <button className="control__btns" onClick={() => setAmount(amount+100)}>
                           +100
                       </button>
                       <button className={store.error || store.nullBalanceError || !store.isAuth || status === 'end' || status === 'play' || store.waitNextGameError || kd || Number(second) <= 2.50  ? 'start__btn disabled' : 'start__btn'} onClick={() => bet(amount)} disabled={store.error || store.nullBalanceError || !store.isAuth || status === 'end' || status === 'play' || store.waitNextGameError || kd || Number(second) == 3  ? true : false}>Поставить</button>
                   </div>    
                </div> 
                <div className='betInfo__div'>
                        {players && players.map((obj) => 
                        <>
                        
                            <div className={hiddenChat ? 'playerBox' : 'playerBoxMini'}  key={obj.bilets.min}>
                                    <div className='playerBetsDiv'>
                                        <svg className='coinIcon' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M12 11q-3.75 0-6.375-1.175T3 7q0-1.65 2.625-2.825Q8.25 3 12 3t6.375 1.175Q21 5.35 21 7q0 1.65-2.625 2.825Q15.75 11 12 11Zm0 5q-3.75 0-6.375-1.175T3 12V9.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.687 1.537.213 2.562.213t2.562-.213q1.538-.212 2.963-.687 1.425-.475 2.45-1.237Q21 10.6 21 9.5V12q0 1.65-2.625 2.825Q15.75 16 12 16Zm0 5q-3.75 0-6.375-1.175T3 17v-2.5q0 1.1 1.025 1.863 1.025.762 2.45 1.237 1.425.475 2.963.688 1.537.212 2.562.212t2.562-.212q1.538-.213 2.963-.688t2.45-1.237Q21 15.6 21 14.5V17q0 1.65-2.625 2.825Q15.75 21 12 21Z"/></svg>
                                        {obj.amount}
                                    </div>
                                    <img src={obj.photo} className='playerImg' />
                                    <h3 className='playerInfo'>{obj.name} {obj.surname}</h3>
                                    <div className='ticketDiv'>
                                        <svg className='ticketIcon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="m4.906 11.541 3.551 3.553 6.518-6.518-3.553-3.551-6.516 6.516zm14.198-4.877-1.511-1.512a2.024 2.024 0 0 1-2.747-2.746L13.335.894a1.017 1.017 0 0 0-1.432 0L.893 11.904a1.017 1.017 0 0 0 0 1.432l1.512 1.51a2.024 2.024 0 0 1 2.747 2.748l1.512 1.51a1.015 1.015 0 0 0 1.432 0L19.104 8.096a1.015 1.015 0 0 0 0-1.432zM8.457 16.719l-5.176-5.178L11.423 3.4l5.176 5.176-8.142 8.143z"/></svg>
                                            {obj.bilets.min} - {obj.bilets.max}
                                    </div>   
                            </div>
                            
                        </>
                        )}
                    </div>     
        </>    
        }
    </>
        
    )
};

export default observer(Jackpot);