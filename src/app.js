import express from 'express';
import ProductManager from '../ProductManager.js'

const PORT = 8080

const app = express()

const productAdd = new ProductManager()

app.use(express.urlencoded({extended:true}))

app.get('/product', async (req, res)=>{
    let product = parseInt(req.query.product)

if(!product){
return res.send(await productAdd.getProducts())}

const setProduct = await productAdd.getProducts()
const Limit = setProduct.slice(0, product)

res.send(Limit)
})

app.get('/product:pid', async (req, res)=>{

    let product = parseInt(req.params.product)

    if(!product)
    return res.send({error:"Producto no encontrado"})

    const setProduct = await productAdd.getProducts()
    const productId = setProduct.find(p=>p.id === productId);

    res.send({productId})

    })


app.listen(8080, ()=>console.log("Puerto 8080 activo, listo para recibir peticiones!"))



















