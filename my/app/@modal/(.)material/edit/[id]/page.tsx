import MaterialEdit from '@/app/material/edit/[id]/page';
import { Modal } from './modal';

const Page = ({
  params: { id: photoId },
  searchParams: { executeId },
}: {
  params: { id: string };
  searchParams: {
    executeId?: string;
  };
}) => {
  return (
    <Modal>
      <MaterialEdit params={{ id: photoId }} />
    </Modal>
  );
};

export default Page;
