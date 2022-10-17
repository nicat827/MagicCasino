import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { publicRoutes, privateRoutes } from '../routes';
import { useContext } from 'react';
import { AuthContext } from '../context';
import { Context } from '..';
import {observer} from "mobx-react-lite";


const AppRouter = () => {

    const {store} = useContext(Context)

   
    

    return (
    store.isAuth
        ?
        <Routes>
            <Route path='/' element={<Layout/>}>
                {privateRoutes.map(route => 
                    <Route 
                    path={route.path} 
                    element={route.element} 
                    key={route.path}
                />
                )}
            </Route>
        </Routes>

        : 
        <Routes>
            <Route path='/' element={<Layout/>}>
                {publicRoutes.map(route => 
                    <Route 
                    path={route.path} 
                    element={route.element} 
                    key={route.path} />
                )}
            </Route>
        </Routes>
                
      
    );
};

export default observer(AppRouter);