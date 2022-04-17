const socket = io.connect();

// Productos
function renderProducts(data){
    const html = data.map(product => {
        return (`<tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>
                        <img src= ${product.productImg} alt="Foto del producto">
                    </td>
                </tr>`)
    })
    document.getElementById('products').innerHTML = html
};

socket.on('products', function (data) {renderProducts(data)});

function addProduct(e) {
    const product = {name: document.getElementById('name').value,
                    price: document.getElementById('price').value,
                    photoURL: document.getElementById('productImg').value
                };
    socket.emit('new-product', product);
    return false
};




/// MENSAJES
function render(data) {
    const html = data.map(element => {
        return (` <div>
        <strong> ${element.author}</strong>:
        <em>${element.text}</em>
        </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html
}

socket.on('messages', function (data) {render(data)});

function addMessage(e) {
    const mensaje = {author: document.getElementById('username').value,
                    text: document.getElementById('text').value
                };
    socket.emit('new-message', mensaje);
    return false
}