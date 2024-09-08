import { db } from '@/lib/firebase/init';
import { doc, getDoc } from 'firebase/firestore';
import { materialSelectConverter } from '../types';
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

  return (
    <div className="w-full">
      <MaterialEditForm data={docRef} />
    </div>
  );
};

export default MaterialEdit;
