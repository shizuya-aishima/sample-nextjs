'use client';

import { PrimaryButton } from '@/app/components/atom/button/primaryButton';
import { TextField } from '@/app/components/atom/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { recipeSchema, RecipeType } from '../../types';

type MaterialEditFormProsp = {
  data: RecipeType;
  onClick: (input: RecipeType) => Promise<void>;
};
export const MaterialEditForm = ({ data, onClick }: MaterialEditFormProsp) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RecipeType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: data.name,
      items: data.items,
      id: data.id,
    },
  });

  const formData = getValues();

  const onSubmit = async (input: RecipeType) => {
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
        <label className="m-auto text-nowrap">レシピ名</label>

        <TextField
          oneRegister={register('name')}
          error={errors.name}
          placeholder="材料名"
        />
      </div>
      <div className="flex flex-row gap-4">
        {formData.items.map((item, index) => (
          <div key={index}>
            <label className="m-auto text-nowrap">素材名</label>

            <TextField
              oneRegister={register(`items.${index}.count`)}
              error={errors.items?.[index]?.count}
              placeholder="件数"
              type="number"
            />
          </div>
        ))}
      </div>
      <PrimaryButton>登録</PrimaryButton>
    </form>
  );
};
