export type CreateStockMovementHistoryDTO = {
    type: 'ENTRY' | 'EXIT';
    productId: string;
    description: string;
    quantity: number;
    date: Date;
}