type ProductSale = {
  id: string;
  inventoryStock: number;
};

export interface RegisterSaleDTO {
  branchId: string;
  invoiceNumber: string;
  products: ProductSale[];
}
