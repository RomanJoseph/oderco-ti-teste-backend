-- AddForeignKey
ALTER TABLE "StockMovmentHistory" ADD CONSTRAINT "StockMovmentHistory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
