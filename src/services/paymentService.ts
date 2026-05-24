import { cloudFunctions } from './firebase';

export async function createOrder(orderDetails: {
  amount: number;
  receipt: string;
}) {
  const response = await fetch(cloudFunctions.createOrder, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderDetails),
  });
  return response.json();
}

export async function capturePayment(paymentDetails: unknown) {
  const response = await fetch(cloudFunctions.capturePayment, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentDetails),
  });
  return response.json();
}
