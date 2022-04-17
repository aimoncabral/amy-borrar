const fs = require('fs')

const save = async () => {
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

save();