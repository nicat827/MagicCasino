import React from 'react';
import cl from './Input.module.css'
const Input = ({...props}) => {
    return (
        <input className={cl.input__default}  {...props}>
            
        </input>
    );
};

export default Input;