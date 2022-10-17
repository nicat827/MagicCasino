import React from 'react';
import { Link, useMatch } from 'react-router-dom';

import cl from './CustomLink.module.css'
const CustomLink = ({children, to, ...props}) => {

    const match = useMatch(to)

   

    return (
        
        <Link to={to} className={match ? cl.active : cl.custom__link}  {...props}>
            {children}
        </Link>
      
    );
};

export default CustomLink;