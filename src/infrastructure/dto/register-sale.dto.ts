type ProductSale = {
  id: string;
  inventoryStock: number;
};

export interface RegisterSaleDTO {
  products: ProductSale[];
}
