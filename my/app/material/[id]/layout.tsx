import { Suspense } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex h-full w-full flex-col gap-8">{children}</div>;
};
export default Layout;
