//Dependencias
const express = require('express')
const {Server: HttpServer} =  require('http')
const { SocketAddress } = require('net')
const { allowedNodeEnvironmentFlags } = require('process')
const {Server: IOServer} =  require('socket.io')

//Inicialización de app
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer) 

app.use(express.static('./public'))

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname})
})

//Puerto y manejador de errores
const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Servidor http esuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor ${error}`)); 

const messages = [
    {author: "Mark", text: "what client?"},
    {author: "Johnny", text: "I cannot tell you, it's confidential"},
    {author: "Mark", text: "Oh, come on! why not?"},
    {author: "Johnny", text: "No, I can't. Anyway, how's your sex life?"}
];

io.on('connection', function(socket) {
    console.log('A client is on line');

    socket.emit('messages', messages);

    socket.on('new-message', (data) => {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

