module.exports = class VkDto {
    id;
    href;
    name;
    surname;
    expire;
    photo;

    constructor(model) {
        this.id = model.id;
        this.href = model.href;
        this.name = model.name;
        this.surname = model.surname;
        this.expire = model.expire;
        this.photo = model.photo;
        

    } 
}