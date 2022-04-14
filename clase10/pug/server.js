const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Puerto y manejador de errores
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http esuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor ${error}`));


//Dependencia pug
app.set('views', './views');
app.set('view engine', 'pug');

const products = []

app.get('/', (req, res) => {
    res.render('form', {products});
    })

app.post('/productos', (req, res) => {
    products.push(req.body)
    res.render('form', {products});
    })
