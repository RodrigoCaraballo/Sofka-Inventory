type ProductSale = {
  id: string;
  inventoryStock: number;
};

export interface RegisterSaleData {
  branchId: string;
  products: ProductSale[];
}
