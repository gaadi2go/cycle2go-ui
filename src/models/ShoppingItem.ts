export interface ShoppingItem {
  id?: string;
  cycleId: string;
  brand: string;
  model: string;
  pickupDate: string;
  dropDate: string;
  amt: number | string;
  comment: string;
  customerId: string;
  dayCount: number | string;
}
