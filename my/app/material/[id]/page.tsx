import { db } from '@/lib/firebase/init';
import { doc, getDoc } from 'firebase/firestore';
import { materialConverter } from '../types';

export function generateStaticParams() {
  let slugs = ['test1'];
  return slugs.map((slug) => ({ id: slug }));
}

const MaterialEdit = async ({ params: { id } }: { params: { id: string } }) => {
  const docRef = (
    await getDoc(doc(db, 'material', id).withConverter(materialConverter))
  ).data();

  return <div className="w-full">{docRef?.name}</div>;
};

export default MaterialEdit;
