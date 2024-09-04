import { Suspense } from 'react';

const Layout = ({
  children,
  form,
  table,
}: {
  children: React.ReactNode;
  form: React.ReactNode;
  table: React.ReactNode;
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <Suspense fallback={<div>Loading form...</div>}>{form}</Suspense>
      {table}
    </div>
  );
};
export default Layout;
