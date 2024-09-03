import { Suspense } from 'react';
import { MaterialFrom } from './form';
import { MaterialTable } from './table';

const Material = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      <Suspense fallback={<div>Loading...</div>}>
        <MaterialFrom />
      </Suspense>
      <MaterialTable searchParams={searchParams} />
    </div>
  );
};

export default Material;
