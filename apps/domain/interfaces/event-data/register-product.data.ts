export interface RegisterProductData {
  id?: string;
  name: string;
  description: string;
  price: number;
  inventoryStock?: number;
  category: string;
  branchId: string;
}
