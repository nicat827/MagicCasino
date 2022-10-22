import React from 'react';
import '../styles/Jackpot.css'

const Jackpot = () => {
    
    
    const prompt = () => {
        const arr = []
        let i = 0
        while (i < 5) {
            const res = window.prompt('Введи число:')
            arr.push(Number(res))
            i ++
            
        }
        let sum = 0
        arr.forEach((el) => {
            sum = el + sum
            return sum
        })
        if (100 - Number(sum) < 100) {
            console.log('Меньше 100')
        }
        else {
            console.log('Больше 100')
        }
        
        
        //if (100 - sum)
        //console.log()
    }
    
    return (
        
        <div className='container__flex'>
            <div className='flex item1' onClick={prompt}>
                промпт
                <div className='div text1'>text</div>
            </div>
            
        </div>
            
            
            
         
        
            
    );
};

export default Jackpot;