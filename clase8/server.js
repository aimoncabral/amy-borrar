const express = require('express')
const { Router } = express

const app = express()
const router = Router()

//Puerto y manejador de errores
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor http esuchando en el puerto ${server.address().port}`)
});
server.on("error", error => console.log(`Error en el servidor ${error}`));

//Importo la clase
const ProductsAPI = require('./api.js')

//Lista de productos, parámetro del método save
const api = new ProductsAPI()
api.save({ title: 'Album', price: 500 });
api.save({ title: 'Remera', price: 1000 });
api.save({ title: 'Buzo', price: 1200 });
api.save({ title: 'Mochila', price: 1200 });

app.use('/static', express.static(__dirname + '/public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', router)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

router.route('/productos')
    .get((req, res) => {
        res.send(api.getAll())
    })
    .post((req, res) => {
        const newProduct = req.body
        api.save(newProduct)
        res.send(api.ultimo())
    })

router.route('/productos/:id')
    .get((req, res) => {
        const idProduct = req.params.id
        if (idProduct > api.getAll().length) {
            res.send({error: 'el producto no existe'})
        }
        res.send(api.getById(idProduct))
    })

    .put((req, res) => {
        const products = api.getAll();

        // products.forEach((element, index) => {
        //     if(element.id === req.params.id) {
        //       products.splice(index, 1, req.body)
        //     }
        // };
    })
    
    .delete((req, res) => {
        const idProduct = [req.params.id]
        api.deleteById(idProduct)
        res.json({
            "status": "200",
            "id": req.params.id
        })
    })
