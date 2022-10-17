import React, { useContext, useEffect, useMemo, useState } from 'react';
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
    const [randomNums, setRandomNums] = useState([])
    const [mine1, setMine1] = useState(false)
    const [mine2, setMine2] = useState(false)
    const [mine3, setMine3] = useState(false)
    const [mine4, setMine4] = useState(false)
    const [mine5, setMine5] = useState(false)
    const [mine6, setMine6] = useState(false)
    const [mine7, setMine7] = useState(false)
    const [mine8, setMine8] = useState(false)
    const [mine9, setMine9] = useState(false)
    const [mine10, setMine10] = useState(false)
    const [mine11, setMine11] = useState(false)
    const [mine12, setMine12] = useState(false)
    const [mine13, setMine13] = useState(false)
    const [mine14, setMine14] = useState(false)
    const [mine15, setMine15] = useState(false)
    const [mine16, setMine16] = useState(false)
    const [mine17, setMine17] = useState(false)
    const [mine18, setMine18] = useState(false)
    const [mine19, setMine19] = useState(false)
    const [mine20, setMine20] = useState(false)
    const [mine21, setMine21] = useState(false)
    const [mine22, setMine22] = useState(false)
    const [mine23, setMine23] = useState(false)
    const [mine24, setMine24] = useState(false)
    const [mine25, setMine25] = useState(false)
    const [win, setWin] = useState(0)
    const [gameEnded, setGameEnded] = useState(false)
    const [winsX, setWinsX] = useState([
        {step:'1 ход', x:1.14, canTake: 1.14},
        {step:'2 ход', x:1.3, canTake: 1.3},
        {step:'3 ход', x:1.49, canTake: 1.49},
        {step:'4 ход', x:1.73, canTake: 1.73},
        {step:'5 ход', x:2.02, canTake: 2.02},
        {step:'6 ход', x:2.37, canTake: 2.37},
        {step:'7 ход', x:2.82, canTake: 2.82},
        {step:'8 ход', x:3.38, canTake: 3.38},
        {step:'9 ход', x:4.11, canTake: 4.11},
        {step:'10 ход', x:5.05, canTake: 5.05},
        {step:'11 ход', x:6.32, canTake: 6.32},
        {step:'12 ход', x:8.04, canTake: 8.04},
        {step:'13 ход', x:10.45, canTake: 10.45},
        {step:'14 ход', x:13.94, canTake: 13.94},
        {step:'15 ход', x:19.17, canTake: 19.17},
        {step:'16 ход', x:27.38, canTake: 27.38},
        {step:'17 ход', x:41.07, canTake: 41.07},
        {step:'18 ход', x:65.71, canTake: 65.71},
        {step:'19 ход', x:115, canTake: 115},
        {step:'20 ход', x:230, canTake: 230},
        {step:'21 ход', x:575, canTake: 575},
        {step:'22 ход', x:2300, canTake: 2300},
    ])


    useEffect(() => {
            if (store.id) {
                const res = store.checkActiveGame()
                
                if (res) {
                    res.then((res) => {
                        console.log(res)
                        if (res) {
                            if (res.amount > 0) {
                                setRandomNums(res.mines)
                                setAmountGame(res.amount)
                                setWin(res.amount)
                                setGameStarted(true)
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
    const startGameMines = async (amount, countMines) => {
        setRandomNums([])
        setWin(amount)
        setMine1(false)
        setMine2(false)
        setMine3(false)
        setMine4(false)
        setMine5(false)
        setMine6(false)
        setMine7(false)
        setMine8(false)
        setMine9(false)
        setMine10(false)
        setMine11(false)
        setMine12(false)
        setMine13(false)
        setMine14(false)
        setMine15(false)
        setMine16(false)
        setMine17(false)
        setMine18(false)
        setMine19(false)
        setMine20(false)
        setMine21(false)
        setMine22(false)
        setMine23(false)
        setMine24(false)
        setMine25(false)
        setGameEnded(false)
        if (amount <= 0) {
            amount = 1
            setAmountGame(1)
        }
       
        
        let copy = []
        if (countMines <= 24 && countMines > 1) {
            while (countMines != 0) {
                const randomNum = Math.floor(Math.random() * 25)
                if (!copy.includes(randomNum)) {
                    console.log(randomNum)
                    copy.push(randomNum)
                    countMines = countMines - 1  
                }       
            }
        }
        
       
        
        setRandomNums(copy)
        
        const res = await store.startGameMines(amount, copy)
        if (res) {
            setGameStarted(true)
        }
    }

    

    const endGame = async (win) => {
        
            setGameStarted(false)
            setGameEnded(true)
            
            const res = await store.endGameMines(win)
        
        
    }

    const pressMine = async (position) => {
        const res = await store.pressMine(position)
    }

    

    const winsXMassive = useMemo(() => {
        const mapped = winsX.map((el) => {
            const total = el.x * amountGame
            el.canTake = total.toFixed(2)
            return el
        })
        
        return mapped
    }, [minesCount, amountGame])
    
    return (
        
            <div className='mines__container' style={hiddenChat ? {width:'1200px', transitionDuration:'2s'} : {width:'1000px', transitionDuration:'2s'}}>
                <div className='bet__panel'>
                    <div className='control__panel'>
                        <span className='span__mines'>Количество мин</span>
                        <button className='change__minesCount first' style={ Number(minesCount) === 3 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(3)}>3</button>
                        <button className='change__minesCount' style={ Number(minesCount) === 5 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(5)}>5</button>
                        <button className='change__minesCount' style={ Number(minesCount) === 10 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(10)}>10</button>
                        <button className='change__minesCount' style={ Number(minesCount) === 24 ? {backgroundColor:'rgba(250, 246, 248, 0.4)'} : null} onClick={() => setMinesCount(24)}>24</button>
                        {changeMinesCountInput 
                        ?
                        <input  type='number' className={error ? 'change__minesCount last error' : 'change__minesCount last'} value={minesCount} onChange={(e) => setMinesCount(e.target.value)} />
                        
                        :
                        <button className='change__minesCount last' onClick={() => setChangeMinesCountInput(true)}>Изменить</button>
                        } 
                    </div>

                    <div className='control__panel'>
                        <span className='span__mines'>Сумма игры</span>
                        <button disabled={gameStarted ? true : false} className='change__minesCount first' onClick={() => setAmountGame(1)}>Min</button>
                        <button disabled={gameStarted ? true : false} className='change__minesCount' onClick={() => {
                            if (amountGame >=2 ) {
                                setAmountGame(amountGame / 2)
                            }
                           
                        }}>x/2</button>
                        <input disabled={gameStarted ? true : false} type='number' className='change__minesCount' value={amountGame} onChange={(e) => setAmountGame(e.target.value) } style={{width:'80px', textAlign:'center'}} />
                        <button disabled={gameStarted ? true : false} className='change__minesCount' onClick={() => {
                            if (amountGame >= 1 && amountGame < 10000) {
                                setAmountGame(amountGame * 2)
                            }
                           
                        }}>x2</button>
                        <button disabled={gameStarted || store.isAuth ? true : false} className='change__minesCount Max' onClick={() => setAmountGame(10000)}>Max</button>
                        
                    </div>
                    {gameStarted 
                    ?
                    <button className={store.error  || !win || win===amountGame ? 'startGame__btn disabled2' : 'startGame__btn' } onClick={() => {
                        if (win > amountGame) {
                            
                            endGame(win)
                        }
                        
                        
                    }}  disabled={store.error  || !win || win===amountGame ? true : false}>Забрать {win}</button>
                    :
                    <button className={store.isAuth  && !error ? 'startGame__btn' : 'startGame__btn disabled2'}  onClick={() => startGameMines(amountGame, minesCount)} disabled={store.error || !store.isAuth || error ? true : false}>Начать игру</button>
                }
                
                   

                </div>
                <div className='mines__panel'>
                    <button disabled={gameStarted && store.isAuth ? false : true} className={
                gameStarted && store.isAuth 
                    ?
                    mine1 
                        ? mine1==='lose' 
                            ? 'mines__item lose' 
                            : 'mines__item win' 
                    : 'mines__item'   
                    : 
                gameEnded
                       
                        ? mine1
                            ? randomNums.includes(0) 
                                ? 'mines__item disabled lose' 
                                :  'mines__item disabled win'
                            : randomNums.includes(0) 
                                ? 'mines__item disabled lose opacity' 
                                :  'mines__item disabled win opacity'   
                    : 'mines__item disabled'}
                        onClick={() => {
                        
                        if (randomNums.includes(0)) {
                            setMine1('lose')
                            endGame(0)     
                        } 
                        else {
                            pressMine(1)
                            setMine1('win')
                        }
                        
                    }}>{gameStarted && store.isAuth 
                        ?
                        mine1 
                            ? mine1==='lose' 
                                ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                </svg>
                                 
                                : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
                                <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"/>
                                <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                            : null   
                        : 
                    gameEnded 
                        ? mine1
                            ? randomNums.includes(0) 
                                ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                </svg>
                                : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                            : randomNums.includes(0) 
                                ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                </svg>
                                  
                                :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                
                        : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(1)) {
                            setMine2('lose')
                            endGame(0)     
                        }
                        else {
                            setMine2('win')
                            pressMine(2)
                        }
                    }} disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine2 
                                ? mine2==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine2
                                ? randomNums.includes(1) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(1) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine2 
                                    ? mine2==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine2
                                    ? randomNums.includes(1) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(1) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(2)) {
                            setMine3('lose')
                            endGame(0)     
                        }
                        else {
                            setMine3('win')
                        }
                    }}   disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine3 
                                ? mine3==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine3
                                ? randomNums.includes(2) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(2) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                        : 'mines__item disabled'}>{gameStarted && store.isAuth 
                            ?
                            mine3 
                                ? mine3==='lose' 
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                                     
                                    : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    
                                : null   
                            : 
                        gameEnded 
                            ? mine3
                                ? randomNums.includes(2) 
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                                    : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    
                                : randomNums.includes(2) 
                                    ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                    </svg>
                                      
                                    :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                    
                            : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(3)) {
                            setMine4('lose')
                            endGame(0)     
                        }
                        else {
                            setMine4('win')
                        }
                    }}   disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine4 
                                ? mine4==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine4
                                ? randomNums.includes(3) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(3) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine4
                                    ? mine4==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine4
                                    ? randomNums.includes(3) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(3) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(4)) {
                            setMine5('lose')
                            endGame(0)     
                        }
                        else {
                            setMine5('win')
                        }
                    }}   disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine5 
                                ? mine5==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine5
                                ? randomNums.includes(4) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(4) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine5 
                                    ? mine5==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine5
                                    ? randomNums.includes(4) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(4) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(5)) {
                            setMine6('lose')
                            endGame(0)     
                        }
                        else {
                            setMine6('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine6 
                                ? mine6==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine6
                                ? randomNums.includes(5) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(5) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine6 
                                    ? mine6==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine6
                                    ? randomNums.includes(5) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(5) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(6)) {
                            setMine7('lose')
                            endGame(0)     
                        }
                        else {
                            setMine7('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine7 
                                ? mine7==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine7
                                ? randomNums.includes(6) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(6) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine7 
                                    ? mine7==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine7
                                    ? randomNums.includes(6) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(6) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(7)) {
                            setMine8('lose') 
                            endGame(0)    
                        }
                        else {
                            setMine8('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine8 
                                ? mine8==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine8
                                ? randomNums.includes(7) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(7) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine8 
                                    ? mine8==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine8
                                    ? randomNums.includes(7) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(7) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(8)) {
                            setMine9('lose')
                            endGame(0)     
                        }
                        else {
                            setMine9('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine9 
                                ? mine9==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine9
                                ? randomNums.includes(8) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(8) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine9 
                                    ? mine9==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine9
                                    ? randomNums.includes(8) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(8) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(9)) {
                            setMine10('lose')
                            endGame(0)     
                        }
                        else {
                            setMine10('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine10 
                                ? mine10==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine10
                                ? randomNums.includes(9) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(9) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine10 
                                    ? mine10==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine10
                                    ? randomNums.includes(9) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(9) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(10)) {
                            setMine11('lose')
                            endGame(0)     
                        }
                        else {
                            setMine11('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine11 
                                ? mine11==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine11
                                ? randomNums.includes(10) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(10) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine11 
                                    ? mine11==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine11
                                    ? randomNums.includes(10) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(10) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(11)) {
                            setMine12('lose')
                            endGame(0)     
                        }
                        else {
                            setMine12('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine12 
                                ? mine12==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine12
                                ? randomNums.includes(11) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(11) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine12 
                                    ? mine12==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine12
                                    ? randomNums.includes(11) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(11) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(12)) {
                            setMine13('lose')
                            endGame(0)     
                        }
                        else {
                            setMine13('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine13 
                                ? mine13==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine13
                                ? randomNums.includes(12) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(12) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine13 
                                    ? mine13==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine13
                                    ? randomNums.includes(12) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(12) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(13)) {
                            setMine14('lose')
                            endGame(0)     
                        }
                        else {
                            setMine14('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine14 
                                ? mine14==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine14
                                ? randomNums.includes(13) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(13) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine14 
                                    ? mine14==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine14
                                    ? randomNums.includes(13) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(13) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                       
                        if (randomNums.includes(14)) {
                            setMine15('lose')
                            endGame(0)     
                        }
                        else {
                            setMine15('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine15 
                                ? mine15==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine15
                                ? randomNums.includes(14) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(14) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine15 
                                    ? mine15==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine15
                                    ? randomNums.includes(14) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(14) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        
                        if (randomNums.includes(15)) {
                            setMine16('lose')
                            endGame(0)     
                        }
                        else {
                            setMine16('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine16 
                                ? mine16==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine16
                                ? randomNums.includes(15) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(15) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine16 
                                    ? mine16==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine16
                                    ? randomNums.includes(15) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(15) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(16)) {
                            setMine17('lose')
                            endGame(0)     
                        }
                        else {
                            setMine17('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine17 
                                ? mine17==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine17
                                ? randomNums.includes(16) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(16) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine17 
                                    ? mine17==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine17
                                    ? randomNums.includes(16) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(16) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(17)) {
                            setMine18('lose')
                            endGame(0)     
                        }
                        else {
                            setMine18('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine18 
                                ? mine18==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine18
                                ? randomNums.includes(17) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(17) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine18 
                                    ? mine18==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine18
                                    ? randomNums.includes(17) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(17) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(18)) {
                            setMine19('lose')
                            endGame(0)     
                        }
                        else {
                            setMine19('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine19 
                                ? mine19==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine19
                                ? randomNums.includes(18) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(18) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine19 
                                    ? mine19==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine19
                                    ? randomNums.includes(18) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(18) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(19)) {
                            setMine20('lose')
                            endGame(0)     
                        }
                        else {
                            setMine20('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine20
                                ? mine20==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine20
                                ? randomNums.includes(19) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(19) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine20 
                                    ? mine20==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine20
                                    ? randomNums.includes(19) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(19) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(20)) {
                            setMine21('lose')
                            endGame(0)     
                        }
                        else {
                            setMine21('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine21 
                                ? mine21==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine21
                                ? randomNums.includes(20) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(20) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine21 
                                    ? mine21==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine21
                                    ? randomNums.includes(20) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(20) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(21)) {
                            setMine22('lose')
                            endGame(0)     
                        }
                        else {
                            setMine22('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine22 
                                ? mine22==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine22
                                ? randomNums.includes(21) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(21) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine22 
                                    ? mine22==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine22
                                    ? randomNums.includes(21) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(21) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(22)) {
                            setMine23('lose')
                            endGame(0)     
                        }
                        else {
                            setMine23('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine23 
                                ? mine23==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine23
                                ? randomNums.includes(22) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(22) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine23 
                                    ? mine23==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine23
                                    ? randomNums.includes(22) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(22) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(23)) {
                            setMine24('lose')
                            endGame(0)     
                        }
                        else {
                            setMine24('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine24 
                                ? mine24==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine24
                                ? randomNums.includes(23) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(23) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine24 
                                    ? mine24==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine24
                                    ? randomNums.includes(23) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(23) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                    <button onClick={() => {
                        if (randomNums.includes(24)) {
                            setMine25('lose')
                            endGame(0)     
                        }
                        else {
                            setMine25('win')
                        }
                    }}  disabled={gameStarted && store.isAuth ? false : true} className={
                        gameStarted && store.isAuth 
                            ?
                            mine25 
                                ? mine25==='lose' 
                                    ? 'mines__item lose' 
                                    : 'mines__item win' 
                                : 'mines__item'   
                            : 
                        gameEnded 
                            ? mine25
                                ? randomNums.includes(24) 
                                    ? 'mines__item disabled lose' 
                                    : 'mines__item disabled win'
                                : randomNums.includes(24) 
                                    ? 'mines__item disabled lose opacity' 
                                    :  'mines__item disabled win opacity'
                            : 'mines__item disabled'}>{gameStarted && store.isAuth 
                                ?
                                mine25 
                                    ? mine25==='lose' 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                         
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : null   
                                : 
                            gameEnded 
                                ? mine25
                                    ? randomNums.includes(24) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                        : <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                    : randomNums.includes(24) 
                                        ? <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M35.2743 7.0883L31.1103 11.2532L33.2324 13.3757C33.9851 14.1285 33.9851 15.346 33.2324 16.0909L31.839 17.4845C32.784 19.5749 33.3125 21.8976 33.3125 24.3405C33.3125 33.5432 25.8572 41 16.6563 41C7.45522 41 0 33.5512 0 24.3485C0 15.1457 7.45522 7.689 16.6563 7.689C19.0986 7.689 21.4209 8.21762 23.5109 9.16273L24.9042 7.76909C25.657 7.01622 26.8741 7.01622 27.6189 7.76909L29.741 9.89157L33.9051 5.7267L35.2743 7.0883ZM40.039 4.80562H38.1172C37.5886 4.80562 37.1563 5.23814 37.1563 5.76674C37.1563 6.29537 37.5886 6.72788 38.1172 6.72788H40.039C40.5675 6.72788 41 6.29537 41 5.76674C41 5.23814 40.5675 4.80562 40.039 4.80562ZM35.2344 0C34.7058 0 34.2735 0.432507 34.2735 0.961125V2.88338C34.2735 3.41199 34.7058 3.8445 35.2344 3.8445C35.7628 3.8445 36.1953 3.41199 36.1953 2.88338V0.961125C36.1953 0.432507 35.7628 0 35.2344 0ZM37.949 4.40516L39.3103 3.04356C39.6867 2.66712 39.6867 2.05841 39.3103 1.68197C38.934 1.30552 38.3253 1.30552 37.949 1.68197L36.5876 3.04356C36.2113 3.42001 36.2113 4.02872 36.5876 4.40516C36.9721 4.7816 37.5806 4.7816 37.949 4.40516ZM32.5197 4.40516C32.896 4.7816 33.5047 4.7816 33.881 4.40516C34.2574 4.02872 34.2574 3.42001 33.881 3.04356L32.5197 1.68197C32.1433 1.30552 31.5348 1.30552 31.1583 1.68197C30.782 2.05841 30.782 2.66712 31.1583 3.04356L32.5197 4.40516ZM37.949 7.12834C37.5726 6.75191 36.9641 6.75191 36.5876 7.12834C36.2113 7.50478 36.2113 8.11349 36.5876 8.48994L37.949 9.85153C38.3253 10.228 38.934 10.228 39.3103 9.85153C39.6867 9.47509 39.6867 8.86638 39.3103 8.48994L37.949 7.12834ZM8.96874 21.7855C8.96874 18.9582 11.267 16.6595 14.0938 16.6595C14.7984 16.6595 15.375 16.0829 15.375 15.378C15.375 14.6732 14.7984 14.0965 14.0938 14.0965C9.85758 14.0965 6.40623 17.5486 6.40623 21.7855C6.40623 22.4904 6.98279 23.067 7.68755 23.067C8.39218 23.067 8.96874 22.4904 8.96874 21.7855Z" fill="white"/>
                                        </svg>
                                          
                                        :  <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.9167 5.125L29.0417 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M17.0833 5.125L11.9583 15.375L20.5 35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M29.0417 5.125H11.9583L5.125 15.375L20.5 35.875L35.875 15.375L29.0417 5.125Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M5.125 15.375H35.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                        
                                : null}</button>
                </div>
            <div className='step__div'>
                {winsXMassive && winsXMassive.map((el) =>
                <div key={el.step} className='step__item'>
                    <span>{el.step}</span> 
                    <span>{`${el.x}x`}</span>
                    <span style={{color:'green'}}>{el.canTake}</span> 
                </div>
                )}
            </div>
            </div>
            
                
            
        
    );
};

export default observer(Mines);