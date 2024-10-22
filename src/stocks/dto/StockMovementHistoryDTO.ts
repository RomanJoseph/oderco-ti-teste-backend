import { ProductDTO } from "src/products/dtos/ProductDTO";

export type StockMovementHistoryDTO = {
    id: string;
    type: 'ENTRY' | 'EXIT';
    productId: string;
    description: string;
    quantity: number;
    date: Date;
    createdAt: Date;

    product?: ProductDTO;
}