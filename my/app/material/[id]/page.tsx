export function generateStaticParams() {
  let slugs = ['test1'];
  return slugs.map((slug) => ({ id: slug }));
}

const MaterialEdit = ({ params: { id } }: { params: { id: string } }) => {
  return <div className="card">{id}</div>;
};

export default MaterialEdit;
