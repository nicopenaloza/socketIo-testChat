const main = document.getElementById('chatView');
const input = document.getElementById('inputMSG');


const msgSended = (text) => {
    return `
        <div class="mensajeEnviado">
            <p id="userName"> ${user}: </p>
            <p>${text}</p>
        </div>
`;
}


function checkTagsOnMsg(stringMsg){
    let thereAreArrowLeft = false;
    let thereAreArrowRight = false;
    let mensaje = '';


    for (let i = 0; i < stringMsg.length; i++) {
        if (stringMsg.charAt(i) == '<') thereAreArrowLeft = true;
        if (stringMsg.charAt(i) == '>') thereAreArrowRight = true;
    }
    if (thereAreArrowLeft && thereAreArrowRight){
        mensaje = stringMsg + '';
        mensaje = mensaje.split('>');
        mensaje = mensaje.toString().split('<');
        return mensaje.toString().replaceAll(',', '');
    } else {
        return stringMsg;
    }

}

function updateScroll(){
    main.scrollTop = main.scrollHeight;
}


function SendChat(msg) {
    
    socket.emit('mensaje:enviado', {
        "user": user,
        "id": idChat,
        "msj": msg.children[0].children[1].innerHTML
    });
    
    console.log(user);
}

function sendMsg(){
    let text = input.value;

    if ((text != '' || text != "undefined") && text){
        const container = document.createElement('div');

        container.classList.add('msgEnvHolder');
        container.innerHTML = msgSended(checkTagsOnMsg(text));
    
        main.appendChild(container);

        SendChat(container);

        updateScroll();
        input.value = '';
    }
    
}

input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("buttonMSG").click();
    }
});