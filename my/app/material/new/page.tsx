'use client';

import { db } from '@/lib/firebase/init';
import { addDoc, collection } from 'firebase/firestore';
import { MaterialEditForm } from '../edit/[id]/Form';
import { MaterialType } from '../types';

const MaterialNew = () => {
  const onClick = async (data: MaterialType) => {
    const docRef = await addDoc(collection(db, 'material'), data);
    console.log('Document written with ID: ', docRef.id);
  };

  return (
    <div className="w-full">
      <MaterialEditForm
        data={{ id: '', count: 0, name: '' }}
        onClick={onClick}
      />
    </div>
  );
};

export default MaterialNew;
