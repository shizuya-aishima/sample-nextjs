import Link from 'next/link';
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
  let photos = Array.from({ length: 6 }, (_, i) => i + 1);
  return (
    <section className="cards-container">
      {photos.map((id) => (
        <Link className="card" key={id} href={`/photos/${id}`} passHref>
          {id}
        </Link>
      ))}
      {children}
      {form}
      {table}
    </section>
  );
};
export default Layout;
