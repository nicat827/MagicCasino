module.exports = class PromoActivateDto {
    id;
    promo;
    

    constructor(model) {
        this.id = model.id
        this.promo = model.promo;
        

    } 
}