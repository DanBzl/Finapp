let mongoose = require('../node_modules/mongoose');

class DB {
    constructor() {

    }

    getSchema() {
        //ACTIONS
        let mongoose = require('mongoose');
        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            console.log('Open!')
        });
        //Schema
        let customerSchema = new mongoose.Schema({
            name: String,
            type: String,
            timestamp: {type : Date, default: Date.now},
        });
        return customerSchema;
    }

    getModel() {
        let customerSchema = this.getSchema();
        //Model
        let Customer;
        try {
            Customer = mongoose.model('Customer')
        } catch (error) {
            Customer = mongoose.model('Customer', customerSchema);
        }
        return Customer;
    }

    insert(data) {

    }

    findAll() {

    }
}



module.exports = DB;













/*
//crerate DB
mongoose.connect('mongodb://finlexa_mongoadmin:uegief7aiV@localhost:31564/finlex', { useNewUrlParser: true });
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log('connected!')
});

let kittySchema = new mongoose.Schema({
  name: String
});
let Kitten = mongoose.model('Kitten', kittySchema);
let silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence'
*/