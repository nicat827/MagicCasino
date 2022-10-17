import React from 'react';
import cl from './ErrorDiv.module.css';

const ErrorDiv = ({children}) => {
    return (
        <div className={cl.error__div}>
            {children}
        </div>
    );
};

export default ErrorDiv;