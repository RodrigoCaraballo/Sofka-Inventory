type ProductInventoryData = {
  id: string;
  inventoryStock: number;
};

export interface RegisterProductInventoryStockData {
  branchId: string;
  product: ProductInventoryData;
}
