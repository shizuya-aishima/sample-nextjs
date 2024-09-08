import { db } from '@/lib/firebase/init';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  materialCreateConverter,
  materialSelectConverter,
  MaterialType,
} from '../../types';
import { MaterialEditForm } from './Form';

export function generateStaticParams() {
  let slugs = ['test1'];
  return slugs.map((slug) => ({ id: slug }));
}

const MaterialEdit = async ({ params: { id } }: { params: { id: string } }) => {
  const docRef = (
    await getDoc(doc(db, 'material', id).withConverter(materialSelectConverter))
  ).data();

  if (!docRef) {
    return;
  }

  const onClick = async (data: MaterialType) => {
    'use server';
    await setDoc(
      doc(db, 'material', data.id).withConverter(materialCreateConverter),
      data,
    );
  };

  return (
    <div className="w-full">
      <MaterialEditForm data={docRef} onClick={onClick} />
    </div>
  );
};

export default MaterialEdit;
