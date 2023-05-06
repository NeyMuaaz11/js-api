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

    // <================ SETTER METHODS ================> 
    
    setId(id: Number) {
        this.id = id
    }

    setName(name: String){
        this.name = name
    }

    setQuantity(quantity: Number){
        this.quantity = quantity
    }

    // <================ GETTER METHODS ================> 

    getId(): Number {
        return this.id
    }

    getName(): String {
        return this.name
    }

    getQuantity(): Number {
        return this.quantity
    }
}

