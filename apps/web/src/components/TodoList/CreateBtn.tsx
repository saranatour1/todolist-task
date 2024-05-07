"use client";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, InputLabel, Textarea } from "@mantine/core";
import Image from "next/image";
import PlusSign from "../../../public/plus-sign.svg";
import { AddItemsInterface } from "@/constants/types";
import { FormEvent } from "react";

function CreateBtn({ addNewTodoItem }: AddItemsInterface) {
  const [opened, { open, close }] = useDisclosure(false);
  const addItem = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      status: false,
    };
    addNewTodoItem(data);
    close();
  };
  return (
    <>
      {/* // todo: reverse these buttons */}
      <Modal opened={opened} onClose={close} title="اضافة مهمة جديدة" className="p-10 gap-y-8">
        {/* Modal content */}
        <form onSubmit={addItem} className="flex flex-col justify-end items-end w-full gap-y-4">
          <label className="w-full flex flex-col items-end justify-start gap-y-[0.88rem]">
            <span className="text-right w-full">عنوان المهمة</span>
            <input
              name="name"
              placeholder="ادخل عنوان المهمة"
              className="text-right w-full placeholder:text-right px-[0.75rem] py-[0.62rem] shadow-inner-shadow placeholder:text-black-1/70 rounded-[0.375rem] border border-blue-1"
            />
          </label>

          <label className="flex flex-col justify-end items-end w-full gap-y-4">
            <span>الوصف</span>
            <textarea
              name="description"
              className="w-full text-right placeholder:text-right resize-none border border-blue-1 rounded-[0.375rem] px-[0.75rem] py-[0.62rem] h-[9.375rem]"
              placeholder="...ادخل الوصف"
            ></textarea>
          </label>

          <div className="w-full flex items-center justify-center gap-x-[1.44rem] ">
            <button className=" py-[0.62rem] px-4 rounded-[0.5rem] bg-blue-0 text-white-0 font-bold">
              اضافة المهمة
            </button>
            <button type="reset" className="font-bold py-2">
              الغاء العملية
            </button>
          </div>
        </form>
      </Modal>

      <button
        onClick={open}
        className="px-8 py-2 bg-blue-0 flex rounded-[0.375rem] justify-center items-center gap-x-0.5 w-full max-w-[13.75rem]"
      >
        <Image src={PlusSign} alt="plus sign" className=" self-center w-[1.25rem] h-[1.25rem]" />
        <span className="text-[1rem] leading-5 tracking-[0.02rem] text-white-0 font-bold">اضافة مهمة</span>
      </button>
    </>
  );
}

export default CreateBtn;
