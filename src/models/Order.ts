export interface Order {
  id?: string;
  orderDate: string;
  customerId: string;
  totalAmt: number | string;
  status: string;
  customerContact: string;
  customerEmail: string;
  customerName: string;
  delivery: string;
  discount: string;
  end: string;
  paidAmt: string;
  paymentMode: string;
  paymentRef: string;
  pickup: string;
  shippingAddress: string;
  start: string;
}
