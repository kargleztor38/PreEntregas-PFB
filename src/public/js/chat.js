const socket = io()

const user = document.getElementById('userName')
const inputMessage = document.getElementById('mensaje')
const chat = document.getElementById('chat')
const formulario = document.getElementById('formulario')
const deleteChat = document.getElementById('cleanChat')

let usuario = null

if (!usuario) {
	Swal.fire({
		title: 'Bienvenido al chat',
		text: 'Ingresa tu nombre de usuario',
		input: 'text',
		inputValidator: (value) => {
			if (!value) {
				return 'Es necesario tu nombre de usuario'
			}
		}
	})
	.then(entrada => {
		usuario = entrada.value;
		user.innerHTML = usuario
		socket.emit('nuevoUsuario', usuario)
	})
		
}

const scrollWindow = () => {
	const chatContainer = document.getElementById('chatMessages');
	chatContainer.scrollTop = chatContainer.scrollHeight;
}

formulario.onsubmit = (evt) => {
	evt.preventDefault()
	const info = {
		user: usuario,
		message: inputMessage.value
	}
	socket.emit('mensaje', info)
	inputMessage.value = '';
	scrollWindow()
}

socket.on('chat', all => {
	const chatRender = all.map(chat => {
		return `<li><strong>${ chat.user }:</strong> ${ chat.message }</li>`
	}).join('')
	chat.innerHTML = chatRender
})

socket.on('forAll', ( usuario ) => {
	Toastify({
		text: `Ingreso ${ usuario } al chat`,
		duration: 5000,
		position: "right", // `left`, `center` or `right`
		style: {
			background: "linear-gradient(to right, #00b09b, #96c93d)",
		}
	}).showToast();
})

deleteChat.addEventListener('click', () => {
	chat.textContent = '';
	socket.emit( 'removeChat' )
})