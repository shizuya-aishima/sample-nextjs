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
      {form}
      <Suspense fallback={<div>Loading table...</div>}>{table}</Suspense>
    </div>
  );
};
export default Layout;
