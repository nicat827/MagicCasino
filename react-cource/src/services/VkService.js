import axios from 'axios';

export default class VkService  {
    static registrateVk(userData) {
        return axios.post("http://localhost:5000/api/registrate", userData)
    }
    static logout(id) {
        return axios.post("http://localhost:5000/api/logout/vk", {id})
    }
    static getUserDto(id) {
        return axios.post("http://localhost:5000/api/getUser/vk", {id})
    }
    

   
    
}
