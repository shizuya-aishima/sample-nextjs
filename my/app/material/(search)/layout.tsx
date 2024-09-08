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
      {table}
      {children}
    </div>
  );
};
export default Layout;
