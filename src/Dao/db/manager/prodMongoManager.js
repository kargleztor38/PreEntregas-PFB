import modelPro from '../models/products.model.js';

class productsDb {
	getProduct = async ( limit, page, query, sort ) => {
		try {
			const obj = {}
			switch ( query ) {
				case 'Música':
				case 'Electrodomésticos':	
				case 'Tecnología':		
				case 'Calzado':
					obj.category = query
					break;
				case 'disponible':
					obj.stock = { $gte: 25 } 
					break;
				default:
					break;
			}

			const options = {
				page: parseInt(page, 10),
				limit: parseInt(limit, 10),
				sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {},
			}
			
			const resp = await modelPro.paginate( obj, options )	
			return resp
		} catch (error) { 
			return ( console.log(error), error )
		}
	};

	addProduct = async ( obj ) => {
		try {
			const { title, description, img, code, stock, price, category, status } = obj;
			await modelPro.create({ title, description, img, code, stock, price, category, status });
			return 'Producto agregado correctamente'
		} catch (error) {
			return error
		};
	};

	addManyProducts = async ( obj ) => {
		try {
			await modelPro.insertMany( obj )
			return 'Productos agregados correctamente'
		} catch (error) {
			return error
		}
	}

	getProductById = async (id) => {
		try {
			const resp = await modelPro.findById(id)
			return resp;
		} catch (error) {
			return error
		};
	};

	updateProductById = async (id, products) => {
		try {
			await modelPro.updateOne({'_id': Object(id)}, { $set:  products });
			return await this.getProductById(id);
		} catch (error) {
			return error
		}
	}

	deleteOneById = async (id) => {
		try {
			await modelPro.deleteOne({ _id: id });
			return 'Producto eliminado'
		} catch (error) {
			console.log(error);
		}
	};
}
export default productsDb;