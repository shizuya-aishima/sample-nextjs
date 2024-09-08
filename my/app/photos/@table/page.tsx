import { db } from '@/lib/firebase/init';
import {
  collection,
  DocumentData,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAt,
} from 'firebase/firestore';
import { materialConverter } from '../types';
import { Suspense } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Metadata } from 'next';
import Link from 'next/link';

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
      collection(db, 'material').withConverter(materialConverter),
      orderBy('name'),
      startAt(name),
      endAt(name + '\uf8ff'),
      limit(20),
    ),
  );

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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 overflow-x-hidden dark:divide-neutral-700">
          {querySnapshot.docs
            .map((item) => item.data())
            .map((item, i) => (
              <tr key={item.name}>
                <td className="py-3 ps-4">
                  <Link href={'/material/test' + i}>{item.name}</Link>
                </td>
                <td className="py-3 ps-4">{item.count.toLocaleString()}</td>
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
