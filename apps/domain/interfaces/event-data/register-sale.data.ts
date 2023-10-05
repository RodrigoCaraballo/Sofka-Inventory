type ProductSale = {
  id: string;
  inventoryStock: number;
};

export interface RegisterSaleData {
  branchId: string;
  invoiceNumber: string;
  products: ProductSale[];
}
