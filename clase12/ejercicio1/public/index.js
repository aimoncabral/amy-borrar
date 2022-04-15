const socket = io.connect();


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