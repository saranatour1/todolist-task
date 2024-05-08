import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import deletIcon from "../../../public/delete-icon.svg";
import deleteIcon from "../../../public/delete.svg";

interface Props {
  deleteItem: (t: string) => void;
  id: string;
}
function DeleteBtn({ deleteItem, id }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} className="p-10 gap-y-8">
        {/* Modal content */}
        <div className="p-[1.5rem] flex flex-col justify-center items-center gap-y-[2rem]">
          <Image src={deletIcon} alt="delete icon" />
          <p className="text-[1.25rem] leading-[1.875rem] font-medium">
            هل حقا تود حذف المهمة
          </p>
          <p className="text-[1rem] font-normal">
            انت على وشك حذف هذا المهمة, اذا قمت بلاستمرار في هذه العملية سيتم
            حذف هذه المهمة من قائمة المهمام
          </p>
        </div>
        <div className="w-full flex items-center justify-center gap-x-[1.44rem]">
          <button
            onClick={() => {
              deleteItem(id);
              close();
            }}
            className="px-8 py-2 bg-red-0 flex rounded-[0.375rem] justify-center items-center gap-x-0.5 text-white-0 font-bold"
          >
            حذف المهمة
          </button>
          <button type="button" className="font-bold py-2" onClick={close}>
            الغاء العملية
          </button>
        </div>
      </Modal>

      <button onClick={open}>
        <Image src={deleteIcon} alt="pen" />
      </button>
    </>
  );
}

export default DeleteBtn;
