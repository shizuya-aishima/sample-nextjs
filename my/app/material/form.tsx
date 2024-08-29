'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { materialSchema, MaterialType } from './types';
import { TextField } from '../components/atom/input';

export const MaterialFrom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MaterialType>({
    resolver: zodResolver(materialSchema),
  });

  const onSubmit = (data: MaterialType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <TextField
          error={errors.name}
          placeholder="材料名"
          oneRegister={register('name')}
        />
        <button>test</button>
      </div>
    </form>
  );
};
