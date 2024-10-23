import { StockMovmentHistory } from "@prisma/client"
import { ProductWithCategories } from "./ProductWithCategories"

export type StockMovementHistoryWithProductAndCategories = StockMovmentHistory & {
    product: ProductWithCategories
  }
  