export default class product {
    
    static products = new Map();
    id: Number;
    name: String;
    quantity: Number;
    
    constructor(id: Number, name: String, quantity: Number){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
    }
}