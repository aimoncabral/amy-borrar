const fs = require('fs')

class Contenedor {
    constructor(ruta){
        this.ruta = ruta
    };

    async save(product) {
        try {
            const productsList = await this.getAll();

            let id
            if (productsList.length === 0) {
                id = 1;
            } else {
                id = productsList[productsList.length - 1].id + 1;
            };
            product.id = id
            productsList.push(product);

            await fs.promises.writeFile(this.ruta, JSON.stringify(productsList, null, 2));

            return newId;

        } catch (error) {
            return error
        };
    };

    getById(id){
        const products = fs.readFileSync(this.ruta, "utf-8");
        const list2 = JSON.parse(products);        
        const list3 = list2.filter(function (product) {
            return product.id == id;
        });
        console.log(`El producto con el id ${id} es`, (list3));
    };
    
    async getAll() {
        try {
            const products = await fs.promises.readFile(this.ruta, "utf-8");
            const list = JSON.parse(products);
            return list;
        } catch (err) {
            if(err.code === 'ENOENT'){ // significa que el archivo no existe, por ende lo podemos crear con un array vacio
                await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2))
                return "Se creó el archivo";
            };
            return err
        };
    };
    
    deleteById(idToDelete){
        const products = fs.readFileSync(this.ruta, "utf-8");
        const ParsedProducts = JSON.parse(products);     
        const ObjtoDelete = ParsedProducts.findIndex( product => product.id === idToDelete);

        ParsedProducts.splice(ObjtoDelete, 1 );

        fs.promises.writeFile(this.ruta, JSON.stringify(ParsedProducts, null, 2))

    };

    deleteAll(){

        fs.unlinkSync('./productos.txt')

    };
};

const p = new Contenedor("./productos.txt");

async function testContenedor() {
    await p.save({ title: "producto1", price: 200 });
    const products = await p.getAll();
    console.log('console, ', products)
    console.log(p.getById(3));
    p.deleteById(2);
    p.deleteAll();
}

testContenedor();




