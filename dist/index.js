
/* Experssjs only*/

//DATABASE
let express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  app = express(),
  Customer = require('./Customer/Customer');

//SET
app.set('port', 3000);
// Add headers
app.use(function (req, res, next) {
  console.log(req.body);
  // accept json
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  // Website you wish to allow to connect
  res.setHeader('Accept', 'application/json');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type,Authorization,response-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

//tell express that we want to use the public folder
//for our static assets
app.use(express.static(path.join(__dirname, 'finapp')));
app.use(bodyParser.json())



//ACTIONS

//create class
let cust = new Customer();

//insert a new customer
app.post('/customers', (req, res) => {
  cust.insert(req.body).then((r)=>{
    if(r){
      res.json(r);
    }
  });
});

//get all customers
app.get('/customers', (req, res) => {
  cust.findAll().then((r)=>{
    if(r){
      res.json(r);
    }
  });
});

//get all customers
app.get('/customers:id', (req, res) => {
  cust.find_a_customer(req.body).then((r)=>{
    if(r){
      res.json(r);
    }
  });
});

//delete a customer
app.delete('/customers:id', (req, res) => {
  cust.find_a_customer(req.body).then((r)=>{
    if(r){
      res.json(r);
    }
  });
});



// Listen for requests
let server = app.listen(app.get('port'), () => {
  console.log('The server is running on http://localhost:' + app.get('port'));
});




