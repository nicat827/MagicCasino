import React from 'react';
import cl from './BanChat.module.css';

const BanChat = ({children}) => {
    return (
        <div className={cl.ban__div}>
            {children}
        </div>
    );
};

export default BanChat;