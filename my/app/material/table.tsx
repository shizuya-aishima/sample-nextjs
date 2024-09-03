import { db } from '@/lib/firebase/init';
import {
  collection,
  endAt,
  getDocs,
  limit,
  orderBy,
  query,
  startAt,
} from 'firebase/firestore';
import { materialConverter } from './types';
type MaterialTableProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export const MaterialTable = async ({ searchParams }: MaterialTableProps) => {
  console.log(searchParams);
  const querySnapshot = await getDocs(
    query(
      collection(db, 'material').withConverter(materialConverter),
      orderBy('name'),
      startAt(searchParams.name ?? ''),
      endAt(searchParams.name ?? '' + '\uf8ff'),
      limit(20),
    ),
  );
  await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <div className="flex flex-1 flex-col">
      <table>
        <thead>
          <tr>
            <th>名称</th>
            <th>件数</th>
          </tr>
        </thead>
        <tbody>
          {querySnapshot.docs
            .map((item) => item.data())
            .map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.count}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
