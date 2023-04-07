import { IProduct, ProductFilterOptions } from "../interfaces";
import ProductRepository from "../database/repository/product-repository";

const repository = new ProductRepository()

export default class ProductService {

    async createProduct(inputs: IProduct): Promise<IProduct> {
        const newProduct = await repository.createProduct(inputs) as IProduct
        return newProduct
    }

    async getAllProducts(filterOptions: any): Promise<IProduct[]> {
        let allFilters = [ "painting", "sculpture", "photography", "printmaking", "drawing", "textile art" ]
        let { search, filter, minPrice, maxPrice, priceOption } = filterOptions
        let priceSort;

        // Search
        if(search == undefined) search = "";

        //Filter
        if(filter?.length === 0) {
            filter = [...allFilters]
        } else {
            filter = filter.split(",")
        }

        

        //Prices

        if(minPrice == undefined) minPrice === 0;
        if(maxPrice === undefined) maxPrice === Number.POSITIVE_INFINITY;

        //Sorting
        switch(priceOption) {
            case "ascending": {
                priceOption = { price: -1 }
                break;
            }
            case "descending": {
                priceOption = { price: 1 }
                break;
            }

            default: {
                priceOption = undefined
            }
        }
        

        const chosenOptions:ProductFilterOptions = {
            search,
            filter,
            minPrice,
            maxPrice,
            priceSort: priceOption,
        }

        return await repository.getAllProducts(chosenOptions)

    }

    async getProductsById(id:string) {
        return await repository.getProductById(id)
    }

    async deleteProductById(id:string) {
        await repository.deleteProductById(id)
    }

}