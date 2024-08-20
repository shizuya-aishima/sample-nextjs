import { fetchCount } from '@/lib/features/counter/counterAPI';
import SsrComponent from '../components/sample/Sample';
import { onClick } from './actions';
import { PrimaryButton } from '../components/atom/button/primaryButton';
import { MyForm } from './form';

const Page = async () => {
  // Fetch data from external API
  const { data } = await fetchCount(10000);
  console.log(data);
  console.log('ssr');

  return (
    <div>
      <MyForm />
      {data}
      <PrimaryButton onClick={onClick}>sample</PrimaryButton>
      {/* <button onClick={sample}>test</button> */}
      <SsrComponent onClick={onClick} />
    </div>
  );
};

export default Page;
