import { SortOrder } from "mongoose"

export interface IProduct {
    title: string,
    description: string,
    price: number,
    image_url: string,
    art_type: string,
    artist_name: string,
    artist_id: string
}


 type sortOption = { [key: string]: SortOrder }

export interface ProductFilterOptions {
    search?: string;
    filter?: string[];
    minPrice?: number;
    maxPrice?: number;
    priceSort?: sortOption;
  }