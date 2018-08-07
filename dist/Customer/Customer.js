let DB = require('../DB/DB');

class Customer{

    constructor() {  
        this.db = new DB();
    }

    getName(){
       return this.name;
    }

    setName(name){
        return this.name = this.name;
    }

    getType(){
        return this.type;
    }

    setType(type){
        return this.type = this.type;
    }
    
    insert(data){
      let p = new Promise((res, rej)=>{
        let Customer = this.db.getModel();
        let newCust = new Customer(data);
        newCust.save((err) => {
          if (err) {
            console.log(err)
            rej({res: false})
          }
          console.log('inserted');
          res({res: true});
        });
      });
      return p;
    }


    findAll(){
        let p = new Promise((res, rej)=>{
          let Customer = this.db.getModel();
          Customer.find((err, customers)=>{
            if (err){
                rej(true);
                return console.error(err);
            }
            res(customers);
          });
        });
        return p;
    }

    findOne(id){
        let Customer = this.db.getModel();
        Customer.findById(id, (err, customer)=>{
            if (err){
                res(customer);
                return console.error(err);
            }
            rej({res: false});
        });
    }

    find_a_customer(id){
        let Customer = this.db.getModel();
        Customer.findById(id, (err, customer)=>{
            if (err){
                rej({res: false});
                return console.error(err);
            }
            res(customer);
        });
    }

    delete_a_customer(id){
        let Customer = this.db.getModel();
        Customer.deleteOne({ _id: id }, function (err) {
            if(err){
                return console.log("Error", err)
                rej({res: false});
            }
            console.log('deleted!')
            res({res: true});
        });
    }
}



module.exports = Customer;

