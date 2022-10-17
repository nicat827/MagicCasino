import axios from 'axios';


export default class BalanceService  {
    static deposit(id, amount) {
        return axios.post("http://localhost:5000/api/balance/deposit", {id, amount})
    }
    static withdraw(id, amount) {
        return axios.post("http://localhost:5000/api/balance/withdraw", {id, amount})
    }

   
    
}