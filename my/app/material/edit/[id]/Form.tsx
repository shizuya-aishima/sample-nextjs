'use client';

import { PrimaryButton } from '@/app/components/atom/button/primaryButton';
import { TextField } from '@/app/components/atom/input';
import { db } from '@/lib/firebase/init';
import { zodResolver } from '@hookform/resolvers/zod';
import { doc, setDoc } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import {
  materialCreateConverter,
  materialSchema,
  MaterialType,
} from '../../types';
import { useRouter } from 'next/navigation';

type MaterialEditFormProsp = {
  data: MaterialType;
  onClick: (input: MaterialType) => Promise<void>;
};
export const MaterialEditForm = ({ data, onClick }: MaterialEditFormProsp) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialType>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      name: data.name,
      count: data.count,
      id: data.id,
    },
  });

  const onSubmit = async (input: MaterialType) => {
    console.log(input);

    await onClick(input);

    router.push('/material');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-2"
    >
      <div className="flex flex-row gap-4">
        <label className="m-auto text-nowrap">素材</label>

        <TextField
          oneRegister={register('name')}
          error={errors.name}
          placeholder="材料名"
        />
      </div>
      <div className="flex flex-row gap-4">
        <label className="m-auto text-nowrap">在庫数</label>

        <TextField
          oneRegister={register('count')}
          error={errors.count}
          placeholder="件数"
          type="number"
        />
      </div>
      <PrimaryButton>登録</PrimaryButton>
    </form>
  );
};
