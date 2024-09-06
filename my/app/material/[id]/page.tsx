// export const dynamicParams = false;

export function generateStaticParams() {
  let slugs = ['test1'];
  return slugs.map((slug) => ({ id: slug }));
}

const Page = ({ params: { id } }: { params: { id: string } }) => {
  return <div className="card">{id}</div>;
};

export default Page;
// export const dynamic = 'force-dynamic';
