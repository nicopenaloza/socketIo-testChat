const socket = io();
const userInElement = document.getElementById('usernameIn');
const userInput = document.getElementById('usernameInput');
const idInput_ = document.getElementById('idRoomInput');
const idInput_Element = document.getElementById('salaIdInput');

const chat = document.getElementById('nuevoChat');
const id = document.getElementById('salaID');

let menuActive = false;
let idChat = undefined;
let user = '';
let opcion = '';

function hideButtons() {
    const botones = document.getElementById('buttonsChat');

    botones.classList.add('hidden');
    menuActive = true;
}

function focusChat() {
    document.getElementById("inputMSG").focus();
}

function hideUserInput(){
    userInElement.classList.add('hidden');
}

function hideRoomInput() {
    idInput_Element.classList.add('hidden');
}


function asignarID() {
    idChat = Math.floor(Math.random()*1E16);
}

function newChatCreated(id_){

    const packageToSend = {
        "id":id_
    }

    socket.emit('onChatRoomCreated', packageToSend);
    console.log('Nuevo chat creado.');
}


function mostrarNuevoChat (id_ = idChat){
    if (user != '' && user != undefined){
       
        id.value = `ID : ${id_}`;
        idChat = id_;

        hideUserInput();
        hideRoomInput();
        chat.classList.remove('hidden');
        newChatCreated(idChat);
        focusChat();
    }
}

function setUser(parm_){
    hideButtons();
    userInElement.classList.remove('hidden');
    opcion = parm_;
}

function setIdRoom() {
    idInput_Value = idInput_.value;
    console.log(idInput_.value);
    if(idInput_Value != "undefined"){

        mostrarNuevoChat(idInput_.value);
    }

}

function mostrarInputJoinChat(){
    if(idInput_Element != "undefined" && idInput_Element){
        idInput_Element.classList.remove('hidden');
        hideUserInput();

    }

}

function confirmUser(){
    if (userInput != undefined && userInput.value != ''){
        user = userInput.value;
        user = checkTagsOnMsg(user);
        if (opcion == 'newS') {
            asignarID(); 
            mostrarNuevoChat();
        };
        if (opcion == 'joinS') {
            console.log('Join S');
            mostrarInputJoinChat();
        };
    }
}


userInput.addEventListener("keyup", function(event) {

    if (userInput.classList[1] != 'hidden' || userInput.classList.length < 2){
        if (event.keyCode === 13) {
            event.preventDefault();
            document.getElementById("usernameButton").click();
          }
    }
});

