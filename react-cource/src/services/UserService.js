import axios from 'axios';
import { useSelector } from 'react-redux';
import $api from '../http';

export default class UserService  {
    static fetchUsers() {
        return $api.get("/users")
    }

   
    
}