module.exports = class VkDto {
    id;
    href;
    name;
    surname;
    expire;
    photo;
    isAdmin;
    chatBan;
    balance;
    games;

    constructor(model) {
        this.id = model.id;
        this.href = model.href;
        this.name = model.name;
        this.surname = model.surname;
        this.expire = model.expire;
        this.photo = model.photo;
        this.isAdmin = model.isAdmin;
        this.chatBan = model.chatBan;
        this.balance = model.balance;
        this.games = model.games;
        

    } 
}