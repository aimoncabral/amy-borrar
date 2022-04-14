const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

//Puerto y manejador de errores
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http esuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor ${error}`));


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const products = []

app.get('/', (req, res) => {
    res.render('main', {products});
})

app.post('/productos',(req, res) => {
    products.push(req.body)
    res.render('main', {products});
})