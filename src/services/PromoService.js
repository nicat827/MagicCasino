import axios from 'axios';


export default class PromoService  {

    static async createPromo(promo, count, amount, type) {
        return axios.post("http://localhost:5000/api/promo/create", {promo, count, amount, type})
    }
    static async getPromoFromDb(type) {
        return axios.post("http://localhost:5000/api/promo/get", {type})
    }

    static activatePromo(promo, id) {
        return axios.post("http://localhost:5000/api/promo/activate", {promo, id})
    }
    


    
}