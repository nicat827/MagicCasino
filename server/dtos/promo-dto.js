module.exports = class PromoDto {
    
    promo;
    count;
    amount;
    type;

    constructor(model) {
        this.promo = model.promo;
        this.count = model.count;
        this.amount = model.amount;
        this.type = model.type;

    } 
}