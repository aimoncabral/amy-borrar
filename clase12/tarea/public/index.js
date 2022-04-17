const socket = io.connect();

/// MENSAJES
/// Esto Renderiza en el html los mensajes
function render(data) {
    
    const html = data.map(element => {
        return (` <div>
        <strong> ${element.author}</strong>:
        <strong> ${element.hora}</strong>:
        <em>${element.text}</em>
        </div>`);
    }).join(" ");
    document.getElementById('messages').innerHTML = html
}

/// Llama la funcion render
socket.on('messages', function (data) {render(data)});

/// Esto toma los valores del formulario y envia los valores al servidor
function addMessage(e) {
    const lahora = Date()
    const mensaje = {author: document.getElementById('username').value,
                    hora: lahora,
                    text: document.getElementById('text').value
                };
    socket.emit('new-message', mensaje);
    return false
}



// function SaludarMaude(){
//     console.log('Hola Maude, hola!')
// }

/// Trigger para que al clickear el boton, suceda algo
// document.getElementById("submitBtn").click(alert("HOLA")); 
