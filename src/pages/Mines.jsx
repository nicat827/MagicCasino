import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../UI/Button/Button';
import axios from 'axios';
import Store from '../store/store';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import '../styles/Mines.css'
import { AuthContext } from '../context';

const Mines = () => {



    const {store}  = useContext(Context)
    const [changeMinesCountInput, setChangeMinesCountInput] = useState(false)
    const [minesCount, setMinesCount] = useState(3)
    const [amountGame, setAmountGame] = useState(1)
    const [error, setError] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [mines, setMines] = useState([])
    const [clickedCells, setClickedCells] = useState([])
    const [status, setStatus] = useState(null)
    const [win, setWin] = useState(0)
    const [gameEnded, setGameEnded] = useState(false)
    const [stepMassive, setStepMassive] = useState([])
    const [wait, setWait] = useState([])
    const [winsX, setWinsX] = useState([])
    const [cells,setCells] = useState([])
    const stepDiv = useRef(null)

    useEffect(() => {
        let copy = []
        let i = 1
        while (i <= 25) {
            copy.push({id:i})
            i++
        }
        console.log(copy)
        setCells(copy)
    }, [])
    useEffect(() => {
            if (store.id) {
                setWait(true)
                
                
               const res = store.checkActiveGame() 
                if (res) {
                    res.then((res) => {
                        if (res) {
                            if (res.status === 'active') {
                                setAmountGame(res.amount)
                                setGameStarted(true)
                                setWin(res.amount)
                                setClickedCells(res.click)
                                setWait(false)
                                setMinesCount(res.count)
                            }
                        }
                        }   
                       
                   
                    ,res.catch(e => console.log(e)))
                }
                
            }
    }, [store.id])


    

    const {hiddenChat, setHiddenChat} = useContext(AuthContext)
    useEffect(() => {
        if (minesCount <= 1 || minesCount > 24)
        setError(true)
        else {
            setError(false)
        }
    }, [minesCount])
    const startGameMines = async (countMines) => {
       
        setChangeMinesCountInput(false)
        setMines([])
        setClickedCells([])
        setStatus(null)
        setGameEnded(false)
        if (amountGame <= 0 && store.balance > 0) {
            setAmountGame(1)
        }
        stepDiv.current.scrollTo({
            top:0,
            left:0,
            behavior: 'smooth'
        })
        setWait(true)
        const res = await store.startGameMines(amountGame, countMines)
        
        if (res) {
            setAmountGame(res.amount)
            setStatus(res.status)
            setWin(res.amount)
            setGameStarted(true)
            setWait(false)
        }
    }

    

    const endGame = async (win) => {
        
            
            
            const res = await store.endGameMines(win)
            
            if (res) {
                if (res.game) {
                    setGameStarted(false)
                    setGameEnded(true)
                    setMines(res.game.mines)
                    setClickedCells(res.game.click)
                    setStatus(res.game.status) 
                }
                else {
                    setGameStarted(false)
                    setGameEnded(true)
                    setMines(res.mines)
                    setClickedCells(res.click)
                    setStatus(res.status)
                }
            }
            
        
        
    }

    const pressMine = async (position) => {
        setWait(true)
        
        const res = await store.pressMine(position)
        setWait(false)
        if (res) {
            if (res.status ==='lose') {
                setGameEnded(true)
                setGameStarted(false)
                setMines(res.mines)
            }
            setClickedCells(res.click)
            setStatus(res.status)
        }
        
    }

    useEffect(() => console.log(amountGame), [amountGame])

     useMemo(() => {
        if (clickedCells.length === 25 - minesCount && !gameEnded) {
            endGame(win)
        }
        if (window.innerWidth > 1024) {
            if (gameStarted) {
                if (clickedCells.length === 4 || clickedCells.length === 8 || clickedCells.length===12 || clickedCells.length ===16 || clickedCells.length ===20) {
                    let scrollPosition = stepDiv.current.scrollTop
                    stepDiv.current.scrollTo({
                                top: scrollPosition+317,
                                behavior: 'smooth'
                        })
                }
            }
            
        }
        
        else {
            if (clickedCells.length === 3 || clickedCells.length === 6 || clickedCells.length===9 || clickedCells.length ===12 || clickedCells.length ===15 || clickedCells.length === 18 || clickedCells.length === 21) {
                let scrollPosition = stepDiv.current.scrollLeft
                console.log(stepDiv)
                stepDiv.current.scrollTo({
                            left: scrollPosition+stepDiv.current.clientWidth,
                            behavior: 'smooth'
                    })
            }
        }
        
        let i = 0
        let copy = []
        if (!gameStarted) {
            while (25 - Number(minesCount) - i > 0) {
                const x = 25 / (25 - Number(minesCount) - i)
                x = x.toFixed(2)
                const canTake = Number(amountGame) * x
                canTake = canTake.toFixed(2)
                
                
                copy.push({step: `${i+1} ход`, x, canTake, i})
                i++
            }
        }
        if (!gameStarted) {
            setStepMassive(copy) 
        }

        if (gameStarted) {
            stepMassive.map((el) => {
                if (clickedCells.length === el.i+1) {
                    setWin(el.canTake)
                }
            })
        }
        
        
       
        return copy
    }, [minesCount, amountGame, clickedCells, gameStarted])
    
    return (
        
           <div className='mines__container' style={hiddenChat && window.innerWidth > 925 ? {width:'92vw', transitionDuration:'0.5s'} : window.innerWidth > 925 ? {width:'75vw', transitionDuration:'0.5s'} : null}>
                {window.innerWidth <= 1024 ? (
                    <>
                    <div className="step__container">
                    <svg onClick={() => {
                    let scrollPosition = stepDiv.current.scrollLeft
                    console.log(scrollPosition)
                    stepDiv.current.scrollTo({
                        left: scrollPosition-315,
                        behavior: 'smooth'
                })
                }} fill='white' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M10 22 0 12 10 2l1.775 1.775L3.55 12l8.225 8.225Z"/></svg>
                    
                        <div className='step__div' ref={stepDiv}>
           
           {stepMassive.map((el) =>
               <div key={el.step} className={clickedCells.length  === el.i && gameStarted ?  'step__item active' : el.i > clickedCells.length  && status !== 'lose' ? 'step__item' : status === 'lose' && el.i === clickedCells.length-1  ? 'step__item lose' : el.i < clickedCells.length ? 'step__item win' : 'step__item'}>
               <span>{el.step}</span> 
               <span>{`${el.x}x`}</span>
               <span>{el.canTake}</span> 
       </div>
           )}
  
                        </div>
                       
                        <svg onClick={() => {
                    let scrollPosition = stepDiv.current.scrollLeft
                    console.log(scrollPosition)
                    stepDiv.current.scrollTo({
                        left: scrollPosition+stepDiv.current.clientWidth,
                        behavior: 'smooth'
                })
                }} style={{marginLeft:'10px'}} fill='white' xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M8.025 22 6.25 20.225 14.475 12 6.25 3.775 8.025 2l10 10Z"/></svg>
                       
                        
                    </div>
                    
                    <div className='mines__panel'>
                    {cells.map((obj) =>
                        <button  key={obj.id} disabled={gameStarted && store.isAuth && !wait ? false : true} onClick={() => pressMine(obj.id)} className={ 
                            gameStarted && store.isAuth
                            ? clickedCells.includes(obj.id) && !gameEnded
                                
                                ? status !== 'lose'
                                    ? 'mines__item win'
                                    : 'mines__item lose'
                                : 'mines__item'
        
                                    
                                : gameEnded
                                    ? mines.includes(obj.id)
                                        ? clickedCells.includes(obj.id) 
                                            ? 'mines__item disabled lose'
                                            : 'mines__item disabled lose opacity'
                                    : clickedCells.includes(obj.id)
                                        ? 'mines__item disabled win'
                                        : 'mines__item disabled win opacity'
        
                                : 'mines__item disabled'
                           } >{gameStarted && store.isAuth 
                            ? clickedCells.includes(obj.id) && !gameEnded 
                                ? status !== 'lose'
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                            : null 
                                
                        
                        : gameEnded
                            ? mines.includes(obj.id)
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                                    : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                            
                        : null
                    }</button>
                    
                    )}
               
                    </div>
                {window.innerWidth > 1024 && (
                    <>
                <svg className='arrow-up' onClick={() => {
                    let scrollPosition = stepDiv.current.scrollTop
                    stepDiv.current.scrollTo({
                        top: scrollPosition-stepDiv.current.clientWidth,
                        behavior: 'smooth'
                })
                }} xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M11.958 25.625 10 23.667l10-10 10 9.958-1.958 1.958-8.042-8Z"/></svg>
                <svg onClick={() => {
                    
                    let scrollPosition = stepDiv.current.scrollTop
                    stepDiv.current.scrollTo({
                        top: scrollPosition+317,
                        behavior: 'smooth'
                })
                }} className='arrow-up' xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="m20 25.625-10-10 1.958-1.958L20 21.708l8.042-8.041 1.958 2Z"/></svg></>)
                }
                
                
                
                
                
               
                <div className='bet__panel' style={!hiddenChat && 800 < window.innerWidth <= 1075 ? {width:'270px'} : null}>
                    <div className='control__panel'>
                        <p className='span__mines'>Количество мин</p>
                        <div style={{display:'flex', flexWrap:'nowrap',width:'333px', justifyContent:'center'}}>
                            <button disabled={gameStarted ? true :false} className='change__minesCount first' style={ Number(minesCount) === 3 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(3)}>3</button>
                            <button disabled={gameStarted ? true :false} className='change__minesCount' style={ Number(minesCount) === 5 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(5)}>5</button>
                            <button disabled={gameStarted ? true :false} className='change__minesCount' style={ Number(minesCount) === 10 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(10)}>10</button>
                            <button disabled={gameStarted ? true :false} className='change__minesCount' style={ Number(minesCount) === 24 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(24)}>24</button>
                            {changeMinesCountInput 
                            ?
                            <input  type='number' className={error ? 'change__minesCount last error' : 'change__minesCount last'} value={minesCount} onChange={(e) => setMinesCount(e.target.value)} />
                        
                            :
                            <button className='change__minesCount last' onClick={() => setChangeMinesCountInput(true)}>Изменить</button>
                            } 
                        </div>
                        
                    </div>

                    <div className='control__panel' >
                        <p className='span__mines'>Сумма игры</p>
                        <div style={{display:'flex', flexWrap:'no-wrap',width:'333px', justifyContent:'center'}}>
                            <button disabled={gameStarted ? true : false} className='change__minesCount first' onClick={() => setAmountGame(1)}>Min</button>
                            <button disabled={gameStarted ? true : false} className='change__minesCount' onClick={() => {
                                if (amountGame >=2 ) {
                                    setAmountGame(amountGame / 2)
                                }
                           
                            }}>x/2</button>
                            <input disabled={gameStarted ? true : false} type='number' className='change__minesCount' value={Number(amountGame).toFixed(2)} onChange={(e) => setAmountGame(Number(e.target.value)) } style={{width:'80px', textAlign:'center'}} />
                            <button disabled={gameStarted ? true : false} className='change__minesCount' onClick={() => {
                                if (amountGame >= 1 && amountGame < 10000) {
                                    setAmountGame(amountGame * 2)
                                }
                           
                            }}>x2</button>
                            <button disabled={gameStarted || !store.isAuth ? true : false} className='change__minesCount Max' onClick={() => setAmountGame(Number(store.balance))}>Max</button>
                        </div>
                        
                        
                    </div>
                    {gameStarted 
                    ?
                    <button className={store.error  || clickedCells.length===0 || !gameStarted ? 'startGame__btn disabled2' : 'startGame__btn' } onClick={() => {
                            endGame(win)
                    }}  disabled={store.error  || clickedCells.length===0 || !gameStarted ? true : false}>Забрать {win}</button>
                    :
                    <button className={store.isAuth  && !error ? 'startGame__btn' : 'startGame__btn disabled2'}  onClick={() => startGameMines( minesCount)} disabled={store.error || !store.isAuth || error ? true : false}>Начать игру</button>
                }
                
                </div>
                </>
                
                )
            :
            
             <>
            
                <div className={!hiddenChat &&  window.innerWidth > 800 && window.innerWidth < 1176 ? 'counter__mines minimize' : 800 < window.     innerWidth && window.innerWidth < 1075 ? 'counter__mines minimize': 'counter__mines'} >
                        <div className='bomb__container'>
                            <h3 >{status === 'lose' ? minesCount=== mines.length ? minesCount-1 : minesCount  : minesCount}</h3>
                            <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path  d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                        </svg> 
                    </div>
                    <div className='crystall__container'>
                        <h3 >{ status !== 'lose' ? minesCount === mines.length ? 25 - minesCount -clickedCells.length : 25-minesCount : 25-minesCount}</h3>
                        <svg  width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M5.125 15.375H35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        
                    </div>
                </div>
                <div className='bet__panel' style={!hiddenChat && 800 < window.innerWidth <= 1075 ? {width:'270px'} : null}>
                    <div className='control__panel'>
                        <p className='span__mines'>Количество мин</p>
                        <div style={{display:'flex', flexWrap:'nowrap',width:'333px', justifyContent:'center'}}>
                            <button disabled={gameStarted ? true :false} className='change__minesCount first' style={ Number(minesCount) === 3 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(3)}>3</button>
                            <button disabled={gameStarted ? true :false} className='change__minesCount' style={ Number(minesCount) === 5 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(5)}>5</button>
                            <button disabled={gameStarted ? true :false} className='change__minesCount' style={ Number(minesCount) === 10 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(10)}>10</button>
                            <button disabled={gameStarted ? true :false} className='change__minesCount' style={ Number(minesCount) === 24 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(24)}>24</button>
                            {changeMinesCountInput 
                            ?
                            <input  type='number' className={error ? 'change__minesCount last error' : 'change__minesCount last'} value={minesCount} onChange={(e) => setMinesCount(e.target.value)} />
                        
                            :
                            <button className='change__minesCount last' onClick={() => setChangeMinesCountInput(true)}>Изменить</button>
                            } 
                        </div>
                        
                    </div>

                    <div className='control__panel' >
                        <p className='span__mines'>Сумма игры</p>
                        <div style={{display:'flex', flexWrap:'no-wrap',width:'333px', justifyContent:'center'}}>
                            <button disabled={gameStarted ? true : false} className='change__minesCount first' onClick={() => setAmountGame(1)}>Min</button>
                            <button disabled={gameStarted ? true : false} className='change__minesCount' onClick={() => {
                                if (amountGame >=2 ) {
                                    setAmountGame(amountGame / 2)
                                }
                           
                            }}>x/2</button>
                            <input disabled={gameStarted ? true : false}  className='change__minesCount' value={Number(amountGame).toFixed(2)} onChange={(e) => setAmountGame(Number(e.target.value)) } style={{width:'80px', textAlign:'center'}} />
                            <button disabled={gameStarted ? true : false} className='change__minesCount' onClick={() => {
                                if (amountGame >= 1 && amountGame < 10000) {
                                    setAmountGame(amountGame * 2)
                                }
                           
                            }}>x2</button>
                            <button disabled={gameStarted || !store.isAuth ? true : false} className='change__minesCount Max' onClick={() => setAmountGame(store.balance)}>Max</button>
                        </div>
                        
                        
                    </div>
                    {gameStarted 
                    ?
                    <button className={store.error  || clickedCells.length===0 || !gameStarted ? 'startGame__btn disabled2' : 'startGame__btn' } onClick={() => {
                            endGame(win)
                    }}  disabled={store.error  || clickedCells.length===0 || !gameStarted ? true : false}>Забрать {win}</button>
                    :
                    <button className={store.isAuth  && !error ? 'startGame__btn' : 'startGame__btn disabled2'}  onClick={() => startGameMines(minesCount)} disabled={store.error || !store.isAuth || error ? true : false}>Начать игру</button>
                }
                
                   

                </div>
                <div className='mines__panel'>
                    {cells.map((obj) =>
                        <button  key={obj.id} disabled={gameStarted && store.isAuth && !wait ? false : true} onClick={() => pressMine(obj.id)} className={ 
                            gameStarted && store.isAuth
                            ? clickedCells.includes(obj.id) && !gameEnded
                                
                                ? status !== 'lose'
                                    ? 'mines__item win'
                                    : 'mines__item lose'
                                : 'mines__item'
        
                                    
                                : gameEnded
                                    ? mines.includes(obj.id)
                                        ? clickedCells.includes(obj.id) 
                                            ? 'mines__item disabled lose'
                                            : 'mines__item disabled lose opacity'
                                    : clickedCells.includes(obj.id)
                                        ? 'mines__item disabled win'
                                        : 'mines__item disabled win opacity'
        
                                : 'mines__item disabled'
                           } >{gameStarted && store.isAuth 
                            ? clickedCells.includes(obj.id) && !gameEnded 
                                ? status !== 'lose'
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                            : null 
                                
                        
                        : gameEnded
                            ? mines.includes(obj.id)
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                                    : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                            
                        : null
                    }</button>
                    
                    )}
               
                </div>
            <div className='step__container'>
                <svg className='arrow-up' onClick={() => {
                    let scrollPosition = stepDiv.current.scrollTop
                    stepDiv.current.scrollTo({
                        top: scrollPosition-315,
                        behavior: 'smooth'
                })
                }} xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="M11.958 25.625 10 23.667l10-10 10 9.958-1.958 1.958-8.042-8Z"/></svg>
                <div className='step__div' ref={stepDiv}>
           
                    {stepMassive.map((el) =>
                        <div key={el.step} className={clickedCells.length  === el.i && gameStarted ?  'step__item active' : el.i > clickedCells.length  && status !== 'lose' ? 'step__item default' : status === 'lose' && el.i === clickedCells.length-1  ? 'step__item lose' : el.i < clickedCells.length ? 'step__item win' : 'step__item default'}>
                        <span>{el.step}</span> 
                        <span>{`${el.x}x`}</span>
                        <span>{el.canTake}</span> 
                </div>
                    )}
           
                </div>
                <svg onClick={() => {
                    
                    let scrollPosition = stepDiv.current.scrollTop
                    stepDiv.current.scrollTo({
                        top: scrollPosition+317,
                        behavior: 'smooth'
                })
                }} className='arrow-up' xmlns="http://www.w3.org/2000/svg" height="40" width="40"><path d="m20 25.625-10-10 1.958-1.958L20 21.708l8.042-8.041 1.958 2Z"/></svg>
                
                
            </div></>
                }
                
            
            </div>
            
               
            
        
    );
};

export default observer(Mines);