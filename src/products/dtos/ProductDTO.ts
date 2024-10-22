import { CategoryDTO } from "src/categories/dtos/CategoryDTO";

export type ProductDTO = {
    id: string;
    name: string;
    price: number;

    categories?: CategoryDTO[];
}