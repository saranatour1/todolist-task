import { Todo, TodoResponse } from "@/constants/types";
import CreateBtn from "./CreateBtn";
import SearchBar from "./SearchBar";
import SortBtn from "./SortBtn";
import { Menu, MenuItem, Table } from "@mantine/core";
import Image from "next/image";
import pen from "../../../public/pen.svg";
import deleteIcon from "../../../public/delete.svg";

interface Props {
  todolist: Todo[];
  addNewTodoItem: (t: Todo) => void;
}
function Display({ todolist, addNewTodoItem }: Props) {
  const rows = todolist.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
        <button>
          <Image src={deleteIcon} alt="delete icon"/>
        </button>

        <button>
          <Image src={pen} alt="pen " />
        </button>
      </Table.Td>
      <Table.Td>
      <select className={`${element.status ? "green-1":"gray-0"} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[5.25rem] py-[ 0.0625rem] px-[0.25rem]`}>
          <option value={1}>مكتملة</option>
          <option value={0}>غير مكتملة</option>
        </select>
      </Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.description}</Table.Td>
      <Table.Td>{element.id}</Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="py-[2.5rem] px-[13.12rem] w-full h-full rounded-lg">
      {/* search and sort */}
      <div className="bg-white/75 backdrop-blur-[4px] rounded pt-4 w-full max-w-[63.75rem] mx-auto flex justify-between items-center pl-[1.5rem] pr-[3.25rem]">
        <CreateBtn addNewTodoItem={addNewTodoItem} />
        <div className="flex justify-center items-center gap-x-4 ">
          <SearchBar />
          <SortBtn />
        </div>
      </div>

      <Table.ScrollContainer minWidth={500}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th> </Table.Th>
              <Table.Th>الحالة</Table.Th>
              <Table.Th>الوصف</Table.Th>
              <Table.Th>العنوان</Table.Th>
              <Table.Th>#</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
}

export default Display;
