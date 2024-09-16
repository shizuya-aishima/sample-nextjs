import { PrimaryButton } from '@/app/components/atom/button/primaryButton';
import { db } from '@/lib/firebase/init';
import {
  collection,
  deleteDoc,
  doc,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { materialSelectConverter } from '../../types';

export const metadata: Metadata = {
  title: '素材',
};

type MaterialTableProps = {
  searchParams: {
    name?: string;
    executeId?: string;
  };
};

const Table = async ({ name }: { name: string }) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const querySnapshot = await getDocs(
    query(
      collection(db, 'material').withConverter(materialSelectConverter),
      orderBy('name'),
      startAt(name),
      endAt(name + '\uf8ff'),
      limit(20),
    ),
  );

  const onClickDelete = (id: string) => async () => {
    'use server';

    console.log(id);
    await deleteDoc(doc(db, 'material', id));
  };

  return (
    <div className="w-full divide-y divide-gray-200 rounded-lg border dark:divide-neutral-700 dark:border-neutral-700">
      <table className="min-w-full divide-y divide-gray-200 overflow-scroll dark:divide-neutral-700">
        <thead className="bg-slate-600 text-gray-50">
          <tr>
            <th className="sticky top-0 px-6 py-3 text-center text-base font-bold uppercase">
              名称
            </th>
            <th className="sticky top-0 px-6 py-3 text-center text-base font-bold uppercase">
              件数
            </th>
            <th className="sticky top-0 px-6 py-3 text-center text-base font-bold uppercase">
              削除
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-x-hidden dark:divide-neutral-700">
          {querySnapshot.docs
            .map((item) => item.data())
            .map((item) => (
              <tr key={item.id}>
                <td className="py-3 ps-4 text-blue-600">
                  <Link
                    href={
                      '/material/edit/' + item.id + '?executeId=' + uuidv4()
                    }
                  >
                    {item.name}
                  </Link>
                </td>
                <td className="py-3 ps-4">{item.count.toLocaleString()}</td>
                <td>
                  <PrimaryButton onClick={onClickDelete(item.id)}>
                    delete
                  </PrimaryButton>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const Page = async ({ searchParams }: MaterialTableProps) => {
  const name = searchParams.name || '';
  const executeId = searchParams.executeId || '';

  return (
    <Suspense key={executeId} fallback={<>loading</>}>
      <Table name={name} />
    </Suspense>
  );
};

export default Page;
