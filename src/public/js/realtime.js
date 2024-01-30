const socket = io()

socket.on('sendProduct', (data) => {
	productList(data);
});

const productList = (prod) => {
	const productsContainer = document.getElementById('listProd');
	let htmlProducts = '';
	prod.forEach(p => {
		htmlProducts += `
		<div class='card'>
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
				<p class="desc">ID: ${ p.id }</p>
				<button onclick='deleteProd(${p.id})' type='button' class="action" id='eliminar'>Eliminar</button>
			</div>
		</div>`
	});
	productsContainer.innerHTML = htmlProducts;
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

const remove = document.getElementById('deleteId');

remove.addEventListener('click', () => {
	const inputDeleted = document.getElementById('prodId');
	const deleteId = inputDeleted.value;
	socket.emit('deleteP', deleteId);
	inputDeleted.value = '';
})

const deleteProd = (prodId) => {
	socket.emit('deleteP', prodId);
};