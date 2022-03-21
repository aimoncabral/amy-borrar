// const http = require('http');
// const moment = require('moment');
// const server = http.createServer( (ask, response) =>{
//     response.end('Hello Word')
// });

// const connectedServer = server.listen(8080, () => {
//     const time = moment().format('HH')
//     let message
//     if (time >= 6 && time <= 12) {
//         message = 'Buenos días'
//     } else if (time >= 13 && time <= 19) {
//         message = 'Buenas tardes'
//     }else{
//         message = 'Buenas noches'
//     };
//     console.log(`${messaje} - Servidor http esuchando en el puerto ${connectedServer.address().port}`)
// });

const express = require('express');
const products = require('../ej.js');
const app = express();


const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http esuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor ${error}`)); 

app.get('/products', (req, res) => {
    res.send(products.getAll())
});


app.get('/random', (req, res) =>{
    res.send(products.getById())
});