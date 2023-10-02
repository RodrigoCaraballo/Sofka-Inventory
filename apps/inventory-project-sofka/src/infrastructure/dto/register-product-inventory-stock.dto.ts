type ProductInventoryData = {
  id: string;
  inventoryStock: number;
};

export interface RegisterProductInventoryStockDTO {
  branchId: string;
  product: ProductInventoryData;
}
