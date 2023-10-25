//crear camper
class Camper {
    id;
    name;
    phone_number;
    email;
    group;
    coins;

    constructor(id, name, phone_number, email, group, coins){
        this.id = id;
        this.name = name;
        this.phone_number = phone_number;
        this.email = email;
        this.group = group;
        this.coins = coins;
    }

}

export default Camper