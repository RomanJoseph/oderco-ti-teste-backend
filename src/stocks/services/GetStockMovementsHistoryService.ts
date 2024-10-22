import { Injectable } from "@nestjs/common";
import { StockMovmentHistoryRepository } from "../infra/repositories/StockMovmentHistoryRepository";
import { StockMovmentHistory } from "@prisma/client";

@Injectable()
export class GetStockMovementHistoryService {
    constructor(
        private readonly stockMovmentHistoryRepository: StockMovmentHistoryRepository
    ){}

    public async execute(): Promise<StockMovmentHistory[]>{
        return this.stockMovmentHistoryRepository.findAll();
    }
}