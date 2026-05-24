import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Order } from '../models/Order';

export function subscribeToOrders(
  uid: string,
  callback: (orders: Order[]) => void
) {
  const colRef = collection(db, 'cycle2go/rental/orders');
  const q = query(colRef, where('customerId', '==', uid));
  return onSnapshot(q, (snapshot) => {
    const orders: Order[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Order[];
    callback(orders);
  });
}

export async function placeOrder(uid: string, order: Omit<Order, 'id'>) {
  const orderRef = collection(db, 'cycle2go/rental/orders');
  const shoppingRef = collection(db, 'cycle2go/shopping-list/' + uid);

  const docRef = await addDoc(orderRef, order);

  // Move shopping list items into order sub-collection items, then delete them
  const shoppingSnap = await getDocs(shoppingRef);
  const itemsRef = collection(db, 'cycle2go/rental/orders/' + docRef.id + '/items');
  for (const shopDoc of shoppingSnap.docs) {
    await addDoc(itemsRef, shopDoc.data());
    await deleteDoc(doc(db, 'cycle2go/shopping-list/' + uid, shopDoc.id));
  }
  return docRef;
}
