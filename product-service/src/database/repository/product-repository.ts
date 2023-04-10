import { IProduct, ProductFilterOptions } from "../../interfaces";
import Product from "../models/product-model"


class ProductRepository {

    async createProduct(inputs: IProduct) {
        try {
            const product = await new Product(inputs)
            return await product.save()

        } catch {
            throw new Error("Product creation failed")
        }
    }

    async getAllProducts(filterOptions: ProductFilterOptions) {
        const { search, filter, minPrice, maxPrice, priceSort } = filterOptions

    const products = Product.find()
    .or([
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { artist_name: { $regex: search, $options: "i" } },
    ])
    .where({ art_type: { $in: filter } })
    .where({ price: { $gte: minPrice, $lte:maxPrice } })
    .sort(priceSort)

    
    return products;

    }

    async getProductById(id:string) {
       return await Product.findById(id)
    }

    async deleteProductById(id:string) {
        await Product.findByIdAndDelete(id)
    }
}

export default ProductRepository