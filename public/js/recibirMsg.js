const msgRec = (text, user_) => {
    return `
        <div class="mensajeRecibido">
            <p id="userName"> ${user_}: </p>
            <p>${text}</p>
        </div>
`;
}

function reciveMsg(msg_){
    let text = msg_.text;

    if ((text != '' || text != "undefined") && text){
        const container = document.createElement('div');

        container.classList.add('msgRecHolder');
        container.innerHTML = msgRec(checkTagsOnMsg(text), msg_.user);
    
        main.appendChild(container);
        updateScroll();
        input.value = '';

        console.log(`Mensaje recibido con los siguientes datos:\nUser: ${msg_.user}\nId de la sala: ${msg_.id}\nTexto: ${msg_.text}`)
    }
    
}

socket.on('mensaje:recibido', (mensaje_) => {
    if (idChat == mensaje_.id && mensaje_.socket != socket.id){
        reciveMsg(mensaje_);
    }
});