import axios from 'axios';


export default class MinesService  {

    static async startGame(totalBets, id) {
        return axios.post("http://localhost:5000/api/jackpot/start", {totalBets, id})
    }    
    static async bet(amount, id) {
        return axios.post("http://localhost:5000/api/jackpot/bet", {amount, id})
    }    
    static async checkGame() {
        return axios.get("http://localhost:5000/api/jackpot/check")
    }    
       
}