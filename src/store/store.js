import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import UserService from "../services/UserService";
import VkService from "../services/VkService";
import { AuthContext } from "../context";
import { useContext } from "react";
import ChatService from "../services/ChatService";
import PromoService from "../services/PromoService";
import BalanceService from "../services/BalanceService";
import MinesService from "../services/MinesService";
import JackpotService from "../services/JackpotService";




export default class Store {
    waitNextGameError = false
    nullBalanceError = false
    user = {};
    isLoading = false;
    isAuth = false;
    isEmailError = false;
    messagesMassive = []
    send = false
    userData = {}
    photo = null
    isAdmin = false
    id = null
    balance = 0
    bannedUsers = []
    error = false
    mines = []
    amountMines = null
    minesHistory = []
    waitMassive = [];
    betters = []; 
    doMassive = [];
    muteInfoWindowForAdmin = false; 
    muteInfoWindowForUser = false; 
 


    constructor() {
        makeAutoObservable(this)
    }

    setNullBalanceError(bool) {
        this.nullBalanceError = bool
    }
    setWaitNextGameError(bool) {
        this.waitNextGameError = bool
    }

    setAuth(bool) {
        this.isAuth = bool
    }
    setMuteInfoWindowForAdmin(bool) {
        this.muteInfoWindowForAdmin = bool
    }
    setMuteInfoWindowForUser(bool) {
        this.muteInfoWindowForUser = bool
    }
    setBetters(data) {
        this.betters = data
    }
    setPhoto(photoUrl) {
        this.photo = photoUrl
    }
    setError(bool) {
        this.error = bool
    }

    setMinesHistory(obj) {
        this.minesHistory = obj
    }

    setAmountMines(int) {
        this.amountMines = int
    }

    setMines(massive) {
        this.mines = massive
    }

    setBannedUsers(arr) {
        this.bannedUsers = arr
    }

    setId(int) {
        this.id = int
    }

    setBalance(int) {
        this.balance = int
    }

    
    setAdmin(bool) {
        this.isAdmin = bool
    }

    setUserData(infoUser) {
        this.userData = infoUser
    }

    setSend(bool) {
        this.send = bool
    }

    setUser(user) {
        this.user = user
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    setEmailError(bool) {
        this.isEmailError = bool
    }
    setMessagesMassive(messages) {
        this.messagesMassive = messages
    }

    async login(email, password) {
            
        try {
            
            const response = await AuthService.login(email, password)
            console.log(response)
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            
            return 'OK'
            
           
            
        }
        catch (e) {
            
            console.log(e)
            return e
        }
    }

    async registrateVk(userData) {
        try {
            const response = await VkService.registrateVk(userData)
            if (response) {
                console.log(response);
                this.setAuth(true)
                
            }
            
            
            
        }

        catch (e) {
            console.log(e)
        }
        

    }

    async authVk() {
        this.setLoading(true)
        
       try {
            console.log('log before')
            const VK = window.VK;
            VK.Auth.login(async (res) => {
                if (res.session) {
                    console.log(res)
                    
                    this.setId(res.session.user.setId)
                    const isUser = await this.getUserFromDb(res.session.user.id)
                    
                    if (!isUser) {
                        localStorage.setItem('sid', res.session.sid)
                        
                        const photo = await this.callVKApi(res.session.user.id, res.session.sid)
                        console.log(photo)
                        
                        
                        
                        const photoUrl = photo.response.items[0].sizes.filter(el => el.height < 80)[0].url
                        console.log(photoUrl)
                        if (res.session.user.id === '308516627') {
                           
                            this.setAdmin(true)
                        }
                        else {
                            this.setAdmin(false)
                        }
                        
                        this.setUser({name:res.session.user.first_name, surname:res.session.user.last_name, photo:photoUrl})
                        
                        this.setUserData({id:res.session.user.id, href:res.session.user.href, name:res.session.user.first_name, surname:res.session.user.last_name, expire:res.session.expire,photo:photoUrl, isAdmin:this.isAdmin, balance:this.balance})
                        this.registrateVk(this.userData)
                        this.setId(res.session.user.id)
                        return 'OK'
                    } 
                
                    localStorage.setItem('sid', res.session.sid)
                    this.setId(res.session.user.id)
                    if (res.session.user.id === '308516627') {
                        console.log('ff')
                        this.setAdmin(true)
                    }
                    else {
                        this.setAdmin(false)
                    }
                }
            },4)
            
    } 

        catch (e) {
            console.log(e)
        }

        finally {
            this.setLoading(false)
        }
        return 'OK'
    }

    async deposit(amount) {
        try {
            const res = await BalanceService.deposit(this.id, amount)
            this.setBalance(res.data)
        }
        catch (e) {
            console.log(e);
        }
        
    }
    async withdraw(amount) {
        try {
            const res = await BalanceService.withdraw(this.id, amount)
            this.setBalance(res.data)
        }
        catch (e) {
            
            if (e.response.data.message === 'Недостаточно средств!') {
                console.log('211')
                this.setError(true)
                setTimeout(() => this.setError(false), 2900)
            }
        }
        
    }

    callVKApi = (id, token) => new Promise((resolve, reject) => {
            const VK = window.VK;
            console.log('ok')
            
           
            try {
                VK.Api.call('photos.get',
            {   
                owner_id: String(id),
                album_id:'profile',
                access_token: String(token),
                rev:1,
                count: 1,
                v: 5.194
            },
            
            (i) => {
                
                console.log(i)
                resolve(i) 
                    }
                )
            }

            catch (e) {
                
                console.log(e);
                reject(e)
            }
            
            })
            
    
    
    



    async logoutVk() {
        this.setLoading(true)
        try {
           
            const VK = window.VK;
            VK.Auth.logout((res) => {
                if (!res.session) {
                    this.setAuth(false)
                    this.setAdmin(false)
                    this.setUser({})
                    localStorage.removeItem('sid')
                }
            } )           
        }
        catch (e) {
            console.log(e)
        }
        
        finally {
            this.setLoading(false)
        }

     
        

        
    } 


    

    async registration(email, password, messages) {
        
        try {
            const response = await AuthService.registration(email, password, messages)
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            this.setUser(response.data.user)
            return 'OK'
            
        }
        catch (e) {
            
            console.log(e.response.data.message);
            return e.response.data.message;
        }
    }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token')
            this.setAuth(false)
            this.setUser({})
        }
        catch (e) {
            
            console.log(e);
        }
    }
    

    async checkAuth() {

        this.setLoading(true)
        try {
            const response = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accessToken)
            this.setAuth(true)
            
            this.setUser(response.data.user)
            
        } 
        
        catch (error) {
            
            localStorage.removeItem('token')
            
        }
        
        finally {
            this.setLoading(false)
        }

    }

    async checkAuthVk() {
        this.setLoading(true)
        try {
            const VK = window.VK;
            
            await VK.Auth.getLoginStatus(async (res) => {
            
                if (res.session) {
                    localStorage.setItem('sid', res.session.sid)
                    if (res.session.mid === '308516627') {
                        this.setAdmin(true)
                        
                    }
                    else {
                        this.setAdmin(false) 
                    }
                    this.setId(res.session.mid)      
                    this.getUserFromDb(res.session.mid)
                    
                    
                   
                    
                     
                }
                else {
                    localStorage.removeItem('sid')
                }
            })
        }

        catch (e) {
            console.log(e)
        }
        
    }
    async sendMessage(email, message, name, surname, photo) {
        try {
            if (localStorage.getItem('token')) {
                const response = await ChatService.sendMessage(email, message, null, null)
                    if(response){
                    this.setSend(true)
            }}

            else if (localStorage.getItem('sid')) {
                console.log('fef')
                const response = await ChatService.sendMessage(null, message, name, surname, photo, this.id)
                    if(response){
                        this.setSend(true)
            }}  
        } 
        catch (error) {
            console.log(error);
            if (error.response.data.message) {
                return error.response.data.message;
            }
        }
    }
    async getMessage() {
        try {
            const res = await ChatService.getMessage()
            this.setMessagesMassive(res.data) 
        } 
        catch (error) {
            console.log(error)
        }
    }

    async createPromo(promoName, count, amount, type) {
        try {
            const res = await PromoService.createPromo(promoName, count, amount, type)
            console.log(res)
            return res
        }
        
        catch (e) {
            console.log(e);
        }
    }   

    async changeNickname(newNickname) {
        try {
            if (localStorage.getItem('sid')) {
                const res = await VkService.changeNickname(this.id, newNickname)
                if (res) {
                    this.setUser({name: res.data[0].name, surname: res.data[0].surname, photo: res.data[0].photo})
                }

            }
        }
        catch (e) {
            console.log(e)
        }
    }

    // async banUser(userId, time) {
    //     try {
            
    //         const res = await ChatService.banUser(userId, this.user.name, time)
            
    //         if (res.status === 200) {  
    //             return res.data;
    //         }
    //     }
    //     catch (e) {
    //         console.log(e)
    //     }
    // }

    async getGameMines(id) {
        try {
            const res = await MinesService.getGame(id)
            return res.data;
        } 
        
        catch (error) {
            console.log(error)
        }
    }

    async getUserFromDb(id) {
        
        try {
            const res = await VkService.getUserDto(id)
            console.log(res)
            
            if (res) {
                this.setUser({name:res.data.name, surname:res.data.surname, photo:res.data.photo})
                this.setBalance(res.data.balance.toFixed(2))
                const lastGames = res.data.mines.slice(res.data.mines.length - 10).reverse()
                
                this.setMinesHistory(lastGames)
                this.setAuth(true)
                setTimeout(() => this.setLoading(false),1000)
                
                return res;
            }
           
            return res;
        }

        catch (e) {
            
        }
    }
    async checkGameJackpot() {
        try {
            const res = await JackpotService.checkGame()
            return res.data
        }
        catch(e) {
            console.log(e)
        }
        

    }
    async bet(amount) {
        try {
            if (this.balance < amount) {
                this.setError(true)
                setTimeout(() => this.setError(false), 2900)
            }
            else {
                const addToDb = async (amount, id) => {
                    
                    if (this.doMassive.indexOf(id) === -1) {
                        this.doMassive.push(id)
                        console.log(this.doMassive.length);
                        const res = await JackpotService.bet(amount, id)
                        console.log(res)
                        this.betters.push(res.data)
                        
                        const idx = this.doMassive.indexOf(id); 
                        this.doMassive.splice(idx, 1); 
                        
                        this.waitMassive.forEach((el, i) => { 
                          this.waitMassive.splice(i, 1); 
                          addToDb(el.amount, el.id); 
                        })
                        this.setBalance(res.data.balance.toFixed(2))
                        
                    }
    
                    else {
                        this.waitMassive.push({amount,id: this.id})
    
                    }
                }
                
                console.log(this.id)
                addToDb(amount, this.id) 
               
               
            }
            
        }

        catch (e) {
            console.log(e);
        }
    }

    // async test(amount, date)  {
        
    //     if (delay === 0) {
    //         const res = await JackpotService.bet(amount, this.id)
    //     }
    //     else {

    //     }
        
    // }

    async startGameJackpot(totalBets) {
        try {
            const res = await JackpotService.start(totalBets, this.id)
        }

        catch (e) {
            console.log(e)
        }
    }

    async startGameMines(amount, countMines) {
        try {
            console.log(amount)
            console.log(typeof amount, typeof this.balance)
            if (Number(this.balance) < Number(amount) || Number(this.balance) <= 0) {
                this.setError(true)
                setTimeout(() => this.setError(false), 2900)
            }
            else {
                try {
                    console.log('ff')
                    const res = await MinesService.startGame(amount, countMines, this.id)
                    console.log(res)
                    
                    this.setBalance(res.data.balance)
                    return res.data;
                }
                catch (e) {
                    console.log(e)
                }
                
            }
            

        }
        catch (e) {
            console.log(e);
        }
    }
    async endGameMines(win) {
        try {
           const res = await MinesService.endGame(Number(win), this.id)
           console.log(res)
           this.setBalance(res.data.balance)
           return res.data

        }
        catch (e) {
            console.log(e);
        }
    }

    async checkActiveGame() {
        try {
            console.log(this.id, 'fef');
            const res = await MinesService.check(this.id)
            
            if (res.data) {
                return res.data
            }
        }

        catch (e) {
            console.log(e);
        }
    }

    async pressMine(position) {
        try {
            const res = await MinesService.press(position, this.id)
            return res.data;
        }
        catch (e) {
            console.log(e);
        }
    }

    async usePromo(promo) {
        try {
          
            const res = await PromoService.activatePromo(promo, this.id);
            console.log(res)
            if (res.data.balance) {
                this.setBalance(res.data.balance.toFixed(2))
            }
            
            return res.data;
        } 
        catch (error) {
            console.log(error)
            if (error.response.data) {
                return error.response.data.errors;
            }
           
        }
    }

    async getBannedUsers(type) {
        try {
            const res = await VkService.getBannedUsers(type)
            console.log(res)
            this.setBannedUsers(res.data)
            
        } 
        catch (e) {
            console.log(e)
            
        }
    }

    async unBanUser(id) {
        try {
           const res = await ChatService.unBanUser(id) 
           console.log(res)
        }
        
        catch (error) {
            console.log(error)
        }
    }

    async getPromoFromDb(type) {
        try {
            
            const res = await PromoService.getPromoFromDb(type);
            return res.data;
           
        }

        catch (e) {
            console.log(e)
        }
    }


    async getUsers() {
        try {
            const response = await UserService.fetchUsers();
            console.log(response.data);
            
        } catch (e) {
            console.log(e);
        }
    }
}