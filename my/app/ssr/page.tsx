import { fetchCount } from '@/lib/features/counter/counterAPI';
import SsrComponent from '../components/sample/Sample';
import { onClick } from './actions';

const Page = async () => {
  // Fetch data from external API
  const { data } = await fetchCount(10000);
  console.log(data);
  console.log('ssr');

  return (
    <div>
      {data}
      {/* <button onClick={sample}>test</button> */}
      <SsrComponent onClick={onClick} />
    </div>
  );
};

export default Page;
