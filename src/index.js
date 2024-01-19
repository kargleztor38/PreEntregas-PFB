const express = require('express')

const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/carts.routes')

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true })) // <--- Permite manejar a express url complejas
app.use(express.json()) // <--- Para que express pueda leer los archivos JSON

app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)


app.listen(PORT, () => console.log(`Serve OK - ${PORT}`))