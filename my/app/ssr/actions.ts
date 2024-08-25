'use server';

import { db } from '@/lib/firebase/init';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { converter, Test, testConverter } from './types';

export const onClick = async () => {
  'use server';

  console.log('test');
  return { data: 2 };
};

export const firestoreTest = async () => {
  console.log('test');
  const sample: Test = {
    age: 10,
    email: 'test@gmail.cpm',
    name: 'shizuya',
  };
  const newTest = doc(collection(db, 'test').withConverter(testConverter));
  // later...
  await setDoc(newTest, sample);
  const querySnapshot = await getDocs(
    collection(db, 'test').withConverter(testConverter),
  );
  querySnapshot.forEach((doc) => {
    const test = doc.data();
    console.log(`${doc.id} => ${test}`);
  });
};
