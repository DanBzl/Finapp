# Finapp

Finapp is a demo app for the company "Finlex GmbH"


![Finapp gif](https://github.com/DanBzl/finapp/blob/master/src/assets/GIF.gif)


## What you can do with Finapp

You can add a customer<br>
You can see the customer list<br>
The customers are grouped based on their types. (Classification)<br>
You can search a customer

## Nodejs (v8.11.2) server

Run `node index.js` in dist directory if you want to use expressjs only.<br>
Run `node indexSocket.js` in dist directory if you want to use expressjs with Socket.io.

## Build

Run `ng build --prod --build-optimizer` to build the project.

## Important: After built

Do not forget to change the index.html file:  `<base href="/">` to  `<base href="./">` 


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Used Technologies

## D3js 

Version: v5.5

## Mongoose

Version: v5.2.6

## MongoDB

Version: 4.0.0

## ExpressJs

Version: 4.16.3

## Socket.io-client

Version: 2.1.1

## Socket.io-server

Version: 2.0

## Angular 6

Angular-cli 6.1.2

## Material Design

Version: 6.4.2

