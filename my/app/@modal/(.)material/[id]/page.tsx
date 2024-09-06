import { Modal } from './modal';

const Page = ({ params: { id: photoId } }: { params: { id: string } }) => {
  return <Modal>{photoId}</Modal>;
};

export default Page;
