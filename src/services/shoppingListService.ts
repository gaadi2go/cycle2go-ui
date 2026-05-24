import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Cycle } from '../models/Cycle';

export function subscribeToShoppingList(
  uid: string,
  callback: (items: Cycle[]) => void
) {
  const colRef = collection(db, 'cycle2go/shopping-list/' + uid);
  return onSnapshot(colRef, (snapshot) => {
    const items: Cycle[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Cycle[];
    callback(items);
  });
}

export async function addItemToShoppingList(uid: string, item: Cycle) {
  const colRef = collection(db, 'cycle2go/shopping-list/' + uid);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...data } = item;
  return addDoc(colRef, data);
}

export async function deleteShoppingItem(uid: string, itemId: string) {
  const docRef = doc(db, 'cycle2go/shopping-list/' + uid, itemId);
  return deleteDoc(docRef);
}
