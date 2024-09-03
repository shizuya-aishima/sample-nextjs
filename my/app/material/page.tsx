import { MaterialFrom } from './form';
import { MaterialTable } from './table';

const Material = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return (
    <div className="flex w-full flex-1 flex-col gap-2">
      <MaterialFrom />
      <MaterialTable searchParams={searchParams} />
    </div>
  );
};

export default Material;
