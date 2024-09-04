'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from '../../components/atom/button/primaryButton';
import { TextField } from '../../components/atom/input';
import { materialFromSchema, MaterialType } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const MaterialFrom = () => {
  const router = useRouter(); //ルーターの取得
  const searchParams = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialType>({
    resolver: zodResolver(materialFromSchema),
    defaultValues: {
      name: searchParams?.get('name') ?? '',
    },
  });

  const onSubmit = (data: MaterialType) => {
    console.log(data);
    const params = new URLSearchParams();
    params.set('name', data.name);
    params.set('executeId', uuidv4());

    router.push(`?${params.toString()}`); // 新しいクエリパラメーターでページをリロード
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
    >
      <div className="flex flex-row items-center gap-2 text-center">
        <div className="flex flex-1 flex-row">
          <TextField
            error={errors.name}
            placeholder="材料名"
            oneRegister={register('name')}
          />
        </div>
        <PrimaryButton onClick={handleSubmit(onSubmit)}>検索</PrimaryButton>
      </div>
    </form>
  );
};

export default MaterialFrom;
