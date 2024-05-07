'use client'
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import Image from 'next/image';
import PlusSign from "../../../public/plus-sign.svg"
import { AddItemsInterface } from '@/constants/types';
function CreateBtn({addNewTodoItem}:AddItemsInterface) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
    {/* // todo: reverse these buttons */}
    <Modal opened={opened} onClose={close} title="اضافة مهمة جديدة" className=''>
        {/* Modal content */}
        
    </Modal>

    <button onClick={open} className='px-8 py-2 bg-blue-0 flex rounded-[0.375rem] justify-center items-center gap-x-0.5 w-full max-w-[13.75rem]'>
      <Image src={PlusSign} alt='plus sign' className=' self-center w-[1.25rem] h-[1.25rem]'/>
      <span className='text-[1rem] leading-5 tracking-[0.02rem] text-white-0 font-bold'>اضافة مهمة</span>
    </button>
    </>
  );
}

export default CreateBtn;