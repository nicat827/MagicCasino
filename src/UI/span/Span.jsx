import React from 'react';
import cl from './Span.module.css'
const Span = ({children, ...props}) => {
    return (
        <span className={cl.span} {...props}>
            {children}
        </span>
    );
};

export default Span;