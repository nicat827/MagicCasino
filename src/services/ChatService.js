import axios from 'axios';


export default class ChatService  {

    static async sendMessage(email, message, name, surname, photo, id) {
        return axios.post("http://localhost:5000/api/chat/sendMessage", {email, message, name, surname, photo, id })
    }

    static async banUser(id, moderName, time) {
        return axios.post("http://localhost:5000/api/chat/banUser", {id, moderName, time})
    }

    static async getMessage() {
        return axios.get("http://localhost:5000/api/chat/getMessage")
    }
    static async unBanUser(id) {
        return axios.post("http://localhost:5000/api/chat/unban", {id})
    }
    


    
}