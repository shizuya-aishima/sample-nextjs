'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { PrimaryButton } from '../../../components/atom/button/primaryButton';
import { TextField } from '../../../components/atom/input';
import { materialFromSchema, MaterialType } from '../../types';
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
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
        <PrimaryButton onClick={() => {}}>検索</PrimaryButton>
        <button type="button" onClick={() => router.push('/material/new')}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Page;
