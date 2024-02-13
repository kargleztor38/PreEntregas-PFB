const socket = io()

socket.on('sendProducts', (data) => {
	productList(data);
});

const productList = (prod) => {
	const productsContainer = document.getElementById('listProd');
	productsContainer.innerHTML = '';

	prod.forEach(p => {

		const card = document.createElement('div')
		card.className = 'card';

		card.innerHTML = `
			<div class="image">${ p.img }</div>
			<div class="content">
				<span class="title">
					Titulo: ${ p.title }
				</span>
				<p class="desc">
					Descripción: ${ p.description }
				</p>
				<p class="desc">Codigo: ${ p.code }</p>
				<p class="desc">Stock: ${ p.stock }</p>
				<p class="desc">Precio: ${ p.price }</p>
				<p class="desc">Categoría: ${ p.category }</p>
				<p class="desc">Estado: ${ p.status }</p>
				<p class="desc">ID: ${ p._id }</p>
				<button type='button' class='action delete-btn' id='eliminar'>
					Eliminar
				</button>
			</div>`

		const deleteButton = card.querySelector('#eliminar');

		deleteButton.addEventListener('click', () => {
			deleteProd(p._id)
		});

		productsContainer.appendChild(card);
	});
}

const formEvent = document.getElementById('form')
formEvent.addEventListener('submit', (evt) => {
	evt.preventDefault();
	const product = {
		title: document.getElementById('titleId').value,
		description: document.getElementById('descriptionId').value,
		img: document.getElementById('imgId').value,
		code: document.getElementById('codeId').value,
		stock: document.getElementById('stockId').value,
		price: document.getElementById('priceId').value,
		category:document.getElementById('categoryId').value,
		status: document.getElementById('statusId').value
	}
	socket.emit('addProduct', product);
	formEvent.reset();
});

// Eliminar productos con el input eliminar por ID
const remove = document.getElementById('deleteId');

remove.addEventListener('click', () => {
	const inputDeleted = document.getElementById('prodId');
	const deleteId = inputDeleted.value;
	socket.emit('deleteP', deleteId);
	inputDeleted.value = '';
})

// Eliminar productos con el botón eliminar de la tarjeta
const deleteProd = (prodId) => {
	socket.emit('deleteP', prodId);
};