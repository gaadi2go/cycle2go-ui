import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { Cycle } from '../models/Cycle';

const cyclesCollectionRef = collection(db, 'cycle2go/products/cycles');

export function subscribeToCycles(callback: (cycles: Cycle[]) => void) {
  const q = query(cyclesCollectionRef, where('available', '==', 'Yes'));
  return onSnapshot(q, (snapshot) => {
    const cycles: Cycle[] = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Cycle[];
    callback(cycles);
  });
}

export async function getCycleById(id: string): Promise<Cycle | null> {
  const docRef = doc(db, 'cycle2go/products/cycles', id);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return { id: snap.id, ...snap.data() } as Cycle;
  }
  return null;
}

export async function addCycle(cycle: Omit<Cycle, 'id'>) {
  return addDoc(cyclesCollectionRef, cycle);
}

export async function deleteCycle(id: string) {
  const docRef = doc(db, 'cycle2go/products/cycles', id);
  return deleteDoc(docRef);
}
