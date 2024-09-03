import { MyForm } from './form';
import { UserTable } from './table';

const Page = () => {
  return (
    <div className="flex w-full flex-1 flex-col">
      <MyForm />
      <UserTable />
    </div>
  );
};

export default Page;
