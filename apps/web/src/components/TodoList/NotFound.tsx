import Image from "next/image";
import CreateBtn from "./CreateBtn";
import notFoundTodoList from "../../../public/no-todolist.svg";
import { AddItemsInterface, Todo } from "@/constants/types";

function NotFound({ addNewTodoItem }: AddItemsInterface) {
  return (
    <div className=" w-full min-h-full py-[2.5rem] px-[13.12rem] self-stretch flex flex-col justify-center items-center gap-y-[5rem]">
      <div className=" flex flex-col justify-center items-center pt-[4.06rem] gap-y-9">
        <div className="flex flex-col items-center justify-center">
          <span className="black-1 text-[2.25rem] font-medium tracking-[0.075rem] text-center leading-[3.375rem]">
            لايوجد لديك مهام حتى الان
          </span>
          <span className="black-1 text-[2.25rem] font-medium tracking-[0.075rem] text-center leading-[3.375rem]">
            دعنا نقوم باضافة مهام جديدة
          </span>
        </div>
        {/* // modal button */}
        <CreateBtn addNewTodoItem={addNewTodoItem} />
      </div>
      <Image src={notFoundTodoList} alt="not found" />
    </div>
  );
}

export default NotFound;
