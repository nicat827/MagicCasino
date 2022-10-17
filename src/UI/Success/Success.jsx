import React from 'react';
import cl from './Success.module.css';

const Success = ({children}) => {
    return (
        <div className={cl.success__div}>
            {children}
        </div>
    );
};

export default Success;