const socket = io()

const inputsData = (ident) => {
	document.getElementById(ident).value;
}
const addProd = () => {
	const product = {
		title: inputsData('titleId'),
		description: inputsData('descriptionId'),
		img: inputsData('imgId'),
		code: inputsData('codeId'),
		stock: inputsData('stockId'),
		price: inputsData('priceId'),
		category: inputsData('categoryId'),
		status: inputsData('statusId'),
	}
	console.log(product);
	socket.emit('productos', product);

	return false
}
