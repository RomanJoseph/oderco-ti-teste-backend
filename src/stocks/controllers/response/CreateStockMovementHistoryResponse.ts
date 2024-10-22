export type CreateStockMovementHistoryResponse = {
    productId: string;
    type: 'ENTRY' | 'EXIT';
    quantity: number;
    description: string;
    date: Date;
}