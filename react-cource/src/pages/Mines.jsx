import React, { useContext } from 'react';
import Button from '../UI/Button/Button';
import axios from 'axios';
import Store from '../store/store';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import '../styles/Mines.css'

const Mines = () => {
    const {store}  = useContext(Context)
    
    return (
        <div className='mines'>

                <div className='mines__container'>
                <div className='mines__panel' onClick={() => store.callVKApi()}>
                    fefw
                </div>
                <div className='bet__panel'>
                    fefe
                </div>
                </div>
            
                
            
        </div>
    );
};

export default observer(Mines);