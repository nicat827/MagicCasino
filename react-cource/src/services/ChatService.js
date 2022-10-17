import axios from 'axios';


export default class ChatService  {

    static async sendMessage(email, message, name, surname, photo) {
        return axios.post("http://localhost:5000/api/sendMessage", {email, message, name, surname,photo })
    }

    static async getMessage() {
        return axios.get("http://localhost:5000/api/getMessage")
    }
    


    
}