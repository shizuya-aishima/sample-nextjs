import { db } from '@/lib/firebase/init';
import { collection, getDocs } from 'firebase/firestore';
import { testConverter } from './types';

export const UserTable = async () => {
  console.log('userTable');

  const querySnapshot = await getDocs(
    collection(db, 'test').withConverter(testConverter),
  );
  const dataList = querySnapshot.docs.map((data) => data.data()).map((e) => e);
  return (
    <table className="w-full table-auto hover:table-fixed">
      <thead>
        <tr>
          <th>名前</th>
          <th>メールアドレス</th>
          <th>年齢</th>
        </tr>
      </thead>
      <tbody>
        {dataList.map((data) => (
          <tr key={data.email}>
            <td>{data.name}</td>
            <td>{data.email}</td>
            <td>{data.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
