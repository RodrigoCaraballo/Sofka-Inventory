type ProductSale = {
  productId: string;
  productPrice: number;
  productStock: number;
};

export interface RegisterSaleDTO {
  products: ProductSale[];
}
