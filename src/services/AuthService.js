import axios from 'axios';
import { useSelector } from 'react-redux';
import $api from '../http';

export default class AuthService  {

    static async registration (email , password, messages) {
        return $api.post('/registration', {email, password, messages}) 
           
    }
    
    static async login (email, password) {
        return $api.post( "/login", {email, password})
    }

    

    

    static async logout () {
        return $api.post("/logout")

        
    }
}