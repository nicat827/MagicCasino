import React, { useEffect } from 'react';
import { Link, useMatch } from 'react-router-dom';

import cl from './CustomLink.module.css'
const CustomLink = ({children, to, ...props}) => {

    const match = useMatch(to)
    

   

    return (
        
        <Link to={to} className={match && to !== '/admin-panel827' ? cl.active : to==='/admin-panel827' ? match ? cl.custom__linkTextActive : cl.custom__linkText : cl.custom__link} {...props}>
            {children}
        </Link>
      
    );
};

export default CustomLink;