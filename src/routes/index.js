import React from "react"
import { Navigate } from "react-router-dom"
import AdminPanel from "../pages/AdminPanel"
import Jackpot from "../pages/Jackpot"
import Mines from "../pages/Mines"
import NotFound from "../pages/NotFound"
import Profile from "../pages/Profile"
import Wheel from "../pages/Wheel"

export const privateRoutes = [
    {path:'/profile', element:<Profile/>},
    {path:'*', element:<NotFound/>},
    {path: '/wheel' , element: <Wheel/>},
    {path: '/mines', element: <Mines/>},
    {path: '/classic' , element: <Jackpot/> },
    


]
export const publicRoutes = [
    {path: '/wheel' , element: <Wheel/>},
    {path: '/mines', element: <Mines/>},
    {path: '/classic' , element: <Jackpot/> },  
    {path: '*', element:<NotFound/> },
    
    
]

