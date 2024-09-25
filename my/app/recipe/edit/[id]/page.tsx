import { db } from '@/lib/firebase/init';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  recipeCreateConverter,
  recipeSelectConverter,
  RecipeType,
} from '../../types';
import { RecipeEditForm } from './Form';

export function generateStaticParams() {
  let slugs = ['test1'];
  return slugs.map((slug) => ({ id: slug }));
}

const MaterialEdit = async ({ params: { id } }: { params: { id: string } }) => {
  const docRef = (
    await getDoc(doc(db, 'recipe', id).withConverter(recipeSelectConverter))
  ).data();

  if (!docRef) {
    return;
  }

  const onClick = async (data: RecipeType) => {
    'use server';
    await setDoc(
      doc(db, 'recipe', data.id).withConverter(recipeCreateConverter),
      data,
    );
  };

  return (
    <div className="w-full">
      <RecipeEditForm data={docRef} onClick={onClick} />
    </div>
  );
};

export default MaterialEdit;
