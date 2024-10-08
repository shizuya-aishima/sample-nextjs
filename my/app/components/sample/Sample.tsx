'use server';

import { fetchCount } from '@/lib/features/counter/counterAPI';
import React from 'react';
type SsrComponentProps = {
  onClick: () => void;
};
const SsrComponent = async ({ onClick }: SsrComponentProps) => {
  const { data } = await fetchCount(100);

  return (
    <form action={onClick}>
      {data}
      <input type="url" />
      <input type="text" />
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Button
      </button>
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Button
      </button>
    </form>
  );
};

export default SsrComponent;
