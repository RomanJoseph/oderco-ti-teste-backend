import { Injectable } from "@nestjs/common";
import { StockMovmentHistoryRepository } from "../infra/repositories/StockMovmentHistoryRepository";

@Injectable()
export class GetStockMovementHistoryService {
    constructor(
        private readonly stockMovmentHistoryRepository: StockMovmentHistoryRepository
    ){}

    public async execute(){
        return this.stockMovmentHistoryRepository.findAll();
    }
}