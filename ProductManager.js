import fs from 'fs'


export default class ProductManager{

constructor(){

this.products = [];
this.path = './products.json'
this.productsid = 2;
}

async getProducts(){

try{
    const data = await fs.promises.readFile(this.path);
    this.products = JSON.parse(data);
}
catch(err){
    if (err.code === "ENOENT"){
        this.products = [];
    }
}
    return this.products;
}

async addProduct(Product){
    const id = this.productsid;
    Product.id = id;
    await this.getProducts();
    this.products.push(Product)
    await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8');
}

async getProductById(id){
    
    const Product = this.products.find ((Product) => Product.id === id );
    if (Product){
        await this.getProducts();
    }
    else{
        throw new Err ("Error: producto con id no encontrado")
    } 
    return (Product);
}

async updateProduct(id){
    await this.getProducts();
    const ProductID = this.products.find ((Product) => Product.id === id );
    if (ProductID === -1) {
        throw new Err("Error: producto con id no encontrado");
      }
      const updateProduct = Object.assign([], this.products[ProductID]);
      this.products[ProductID] = updateProduct;
      await fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8");
    }

    async deleteProduct(id){

    await this.getProducts();
    const ProductID = this.products.find ((Product) => Product.id === id );
    if (ProductID === -1) {
        throw new Err("Error: producto con id no encontrado");
      }
      this.products.splice(ProductID, 1);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products), "utf-8");
    }

    }
   const Product1 = new ProductManager()

   
    console.log(await Product1.getProducts());

    const ProductAdd = {
        title: "vaso",
        description: "vaso de plastico con dibujos animados ",
        price: "900",
        thumbnail: "no existe",
        code: "0001",
        stock: "9",
    };
    await Product1.addProduct(ProductAdd);
    console.log(await Product1.getProducts());

    const ProductIden = 2;
    const ProductUpdate = {
        title: "vaso de plastico",
        price: "2000",
        stock: "6",
    };
    await Product1.addProduct(ProductUpdate);
    console.log(await Product1.getProducts());

    await Product1.deleteProduct(ProductIden);
    console.log(await Product1.getProducts()); 
