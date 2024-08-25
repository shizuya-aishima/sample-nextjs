'use server';

import { db } from '@/lib/firebase/init';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { Test, testConverter } from './types';

export const onClick = async () => {
  'use server';

  console.log('test');
  return { data: 2 };
};

export const firestoreTest = async (input: Test) => {
  const newTest = doc(collection(db, 'test').withConverter(testConverter));
  // later...
  await setDoc(newTest, input);
};
