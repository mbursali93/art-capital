import { Request, Response } from "express"

class ProductController {

    async createProduct(req: Request, res: Response) {
        res.status(201).json()
    }

    async getProducts(req: Request, res: Response) {
        try {
            res.status(200).json("works")
        } catch(e:any) {
            res.status(500).json(e.message)
        }
    }

    async getProductById() {

    }


    async updateProduct() {

    }

    async deleteProduct() {

    }
}

export default ProductController