'use client';

import { db } from '@/lib/firebase/init';
import { zodResolver } from '@hookform/resolvers/zod';
import { collection, getDocs } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { PrimaryButton } from '../components/atom/button/primaryButton';
import { firestoreTest } from './actions';

// zodを使って、フィールドのスキーマを定義します
const schema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  age: z.number().min(18, '18歳以上である必要があります'),
});

export const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // zodResolver関数を使って、バリデーション用のリゾルバを作成し、
    // そのまま作成したリゾルバを渡します
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    test();
    firestoreTest();
  };

  const test = async () => {
    console.log('test');
    const querySnapshot = await getDocs(collection(db, 'test'));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
      <div className="flex flex-col">
        <input type="text" placeholder="名前" {...register('name')} />
        {errors.name && (
          <span style={errorStyle}>{errors.name.message?.toString()}</span>
        )}
      </div>

      <input type="email" placeholder="メールアドレス" {...register('email')} />
      {errors.email && (
        <span style={errorStyle}>{errors.email.message?.toString()}</span>
      )}

      <input
        type="number"
        placeholder="年齢"
        {...register('age', { valueAsNumber: true })}
      />
      {errors.age && (
        <span style={errorStyle}>{errors.age.message?.toString()}</span>
      )}

      <PrimaryButton onClick={handleSubmit(onSubmit)}>送信</PrimaryButton>
    </form>
  );
};

const errorStyle = {
  color: 'red',
};
