

module.exports = class UserDto {
    email;
    id;
    isActivated;
    messages;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
        this.messages = model.messages

    } 
}