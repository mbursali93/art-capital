import { Request, Response } from "express"
import ProductService from "../services/product-service"
import ProductRepository from "../database/repository/product-repository"

const service = new ProductService()
const repo = new ProductRepository()

class ProductController {

    async createProduct(req: Request, res: Response) {
        try {
            const newProduct = await service.createProduct(req.body)
            res.status(201).json(newProduct)
        } catch(e:any) {
            res.status(500).json(e.message)
        }
        

    }

    async getProducts(req: Request, res: Response) {
        try {
            let { search, filter, minPrice, maxPrice, priceSort } = req.query
            

             const products =  await service.getAllProducts({ search, filter, minPrice, maxPrice, priceSort })
            res.status(200).json(products)
        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const id = req.params.product_id
            const product = await service.getProductsById(id)
            res.status(200).json(product)
        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }



    async deleteProduct(req: Request, res: Response) {
        try {
            const id = req.params.product_id 
            await service.deleteProductById(id)
            res.status(204).json("Product deleted successfuly")

        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }
}

export default ProductController