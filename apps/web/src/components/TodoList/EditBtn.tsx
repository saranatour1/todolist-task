import { Todo } from "@/constants/types";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import { FormEvent, useState } from "react";
import pen from "../../../public/pen.svg";
import Image from "next/image";

interface Props {
  initialValue: Todo;
  editTodoItem: (t: Partial<Todo> | Todo) => void;
}

function EditBtn({ initialValue, editTodoItem }: Props) {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState(initialValue.name);
  const [description, setDescription] = useState(initialValue.description);

  const editItem = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      status: initialValue.status,
      id: initialValue.id,
    };
    editTodoItem(data);
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="اضافة مهمة جديدة"
      >
        <form
          onSubmit={editItem}
          className="flex flex-col justify-end items-end w-full gap-y-4"
        >
          <label className="w-full flex flex-col items-end justify-start gap-y-[0.88rem]">
            <span className="text-right w-full">عنوان المهمة</span>
            <input
              name="name"
              placeholder="ادخل عنوان المهمة"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-right w-full placeholder:text-right px-[0.75rem] py-[0.62rem] shadow-inner-shadow placeholder:text-black-1/70 rounded-[0.375rem] border border-blue-1"
            />
          </label>

          <label className="flex flex-col justify-end items-end w-full gap-y-4">
            <span>الوصف</span>
            <textarea
              name="description"
              className="w-full text-right placeholder:text-right resize-none border border-blue-1 rounded-[0.375rem] px-[0.75rem] py-[0.62rem] h-[9.375rem]"
              placeholder="...ادخل الوصف"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>

          <div className="w-full flex items-center justify-center gap-x-[1.44rem]">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-0 flex rounded-[0.375rem] justify-center items-center gap-x-0.5 w-full max-w-[13.75rem] text-white-0 font-bold"
            >
              تعديل المهمة
            </button>
            <button type="button" className="font-bold py-2" onClick={close}>
              الغاء العملية
            </button>
          </div>
        </form>
      </Modal>

      <button onClick={open}>
        <Image src={pen} alt="pen" />
      </button>
    </>
  );
}

export default EditBtn;
