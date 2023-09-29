type ProductSale = {
  id: string;
  inventoryStock: number;
};

export interface RegisterSaleData {
  products: ProductSale[];
}
