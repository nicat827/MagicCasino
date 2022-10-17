import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import { API_URL } from "../http";
import UserService from "../services/UserService";
import VkService from "../services/VkService";
import { AuthContext } from "../context";
import { useContext } from "react";
import ChatService from "../services/ChatService";
import { createSuper } from "typescript";


export default class Store {
    
    user = {};
    isLoading = false;
    isAuth = false;
    isEmailError = false;
    messagesMassive = []
    send = false
    userData = {}
    photo = null

    constructor() {
        makeAutoObservable(this)
    }

    setAuth(bool) {
        this.isAuth = bool
    }
    setPhoto(photoUrl) {
        this.photo = photoUrl
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
            
            
        }

        catch (e) {
            console.log(e)
        }
        

    }

    

    async authVk() {
        this.setLoading(true)
        try {
            const VK = window.VK;
            
            VK.Auth.login( async (res) => {
            console.log(res)
            if (res.session) {
                localStorage.setItem('sid', res.session.sid)
                localStorage.setItem('id', JSON.stringify({id: res.session.user.id}))
                const photo = await this.callVKApi()
                console.log(photo, 'auye')
                this.setAuth(true)
                this.setPhoto(photo.response.items[0].sizes.find(img => (img.height <= 75)).url)
                
                
                
                this.setUser({name:res.session.user.first_name, surname:res.session.user.last_name, photo:this.photo})
                console.log(this.user)
                setTimeout(() => {
                        this.setUserData({id: res.session.user.id, href: res.session.user.href, name:res.session.user.first_name, surname:res.session.user.last_name,expire:res.session.expire, photo:this.photo
                    }
                    )
                    this.registrateVk(this.userData)
                    })
                
                
                
            }
            
            
            }, 4)
            
            return 'OK'
        }

        catch (e) {
            console.log(e)
        }
        finally {
            this.setLoading(false)
        }
        
    }

    

    callVKApi = () => new Promise((resolve, reject)=>{
        const VK = window.VK;
        const parsedId = JSON.parse(localStorage.getItem('id'));
        console.log(parsedId)
        const getPhoto = async () => VK.Api.call('photos.getAll', { owner_id: parsedId.id, album_id: 'profile', count: 1, rev: 1, v: 5.131}, (i) => {
            console.log(i, +'greg')
            resolve(i)
        }
 
        )

        console.log(getPhoto())
    })
    
    



    async logoutVk() {
        try {
            const id = JSON.parse(localStorage.getItem('id'))
            console.log(id.id)
            const response = await VkService.logout(id.id);
            console.log(response)
            if(response) {
                this.setAuth(false)
                this.setUser({})
                this.setUserData({})
                localStorage.removeItem('sid')
                localStorage.removeItem('id')
                window.location.replace('/')
            }
           
        }
        catch (e) {
            console.log(e)
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

    checkAuthVk() {
        this.setLoading(true)
        try {
            const VK = window.VK;
            VK.Auth.getLoginStatus(res => {
               if (res.session) {
                    localStorage.setItem('sid', res.session.sid)
                    
                    this.setAuth(true)
                    const id = JSON.parse(localStorage.getItem('id'))
                    console.log(id.id)
                    this.getUserFromDb(id.id)
                   
                    
                     
               }
               else {
                localStorage.removeItem('sid')
               }
            })
        }

        catch (e) {
            console.log(e)
        }
        finally {
            this.setLoading(false)
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
                const response = await ChatService.sendMessage(null, message, name, surname, photo)
                    if(response){
                    this.setSend(true)
            }}  
        } 
        catch (error) {
            console.log(error)
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

    async getUserFromDb(id) {
        try {
            const res = await VkService.getUserDto(id)
            if (res) {
                
                this.setUser({name:res.data[0].name, surname:res.data[0].surname, photo:res.data[0].photo})
            }   
           
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