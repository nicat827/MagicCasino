module.exports = class MessageDto {
    email;
    name;
    surname;
    id;
    message;
    date;
    photo;

    constructor(model) {
        this.email = model.email;
        this.name = model.name;
        this.surname = model.surname;
        this.id = model._id;
        this.message = model.message;
        this.date = model.date;
        this.photo = model.photo;

    } 
}