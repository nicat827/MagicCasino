import axios from 'axios';


export default class MinesService  {

    static async startGame(amount, countMines, id) {
        return axios.post("http://localhost:5000/api/mines/start", {amount, countMines, id})
    }    
    static async endGame(win,id) {
        return axios.post("http://localhost:5000/api/mines/end", {win, id})
    }    
    static async check(id) {
        return axios.post("http://localhost:5000/api/mines/check", {id})
    }    
    static async press(position, id) {
        return axios.post("http://localhost:5000/api/mines/press", {position, id})
    }    
}