import modelPro from '../models/products.model.js';

class productsDb {
	getProduct = async ( limit, page, query, available, sort ) => {
		try {
			const offset = (page - 1) * limit
			const resp = await modelPro.aggregate([
				{ 
					$match: {
						$or: [
							{ category: query },
							{ stock: { $gte: available } }
						]
					}
				},
				{
					$facet: {
						metaDate: [
							{
								$count: 'totalDocument'
							},
							{
								$addFields: {
									pageNumber: page,
									totalPages: { $ceil: { $divide: [ '$totalDocument', limit ] } }
								}
							}
						],
						data: [
							{
								$sort: { price: sort }
							},
							{
								$skip: offset
							},
							{
								$limit: limit
							}
						]
					}
				}
				
			])	
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