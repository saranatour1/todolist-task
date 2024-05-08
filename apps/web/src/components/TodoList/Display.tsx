import { Todo, TodoResponse } from "@/constants/types";
import CreateBtn from "./CreateBtn";
import SearchBar from "./SearchBar";
import SortBtn from "./SortBtn";
import { Menu, MenuItem, Table } from "@mantine/core";
import Image from "next/image";
import pen from "../../../public/pen.svg";

import EditBtn from "./EditBtn";
import DeleteBtn from "./DeleteBtn";

interface Props {
  todolist: Todo[];
  addNewTodoItem: (t: Todo) => void;
  editItem:(t:Todo) => void;
  deleteItem:(t:string) => void;
  sortTodoList:(i:number) => void;
  searchBar:(i:string) => void;
}
function Display({ sortTodoList,todolist, addNewTodoItem , editItem , deleteItem ,searchBar }: Props) {

  const toggle =(e:Event, item:Todo)=>{
    const updatedItem = {...item, status: !item.status}
    editItem(updatedItem)
  }
  const rows = todolist && todolist.length !== 0 ? todolist.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>
          <DeleteBtn id={element.id as number} deleteItem={deleteItem}/>
          <EditBtn initialValue={element} editTodoItem={editItem}/>
      </Table.Td>
      <Table.Td>
        <select value={element.status ? 1 : 0} onChange={(e)=> toggle(e , element)}  className={`${element.status ? "bg-green-1" : "bg-gray-0"} border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-[5.25rem] py-[ 0.0625rem] px-[0.25rem]`}>
          <option value={1}>مكتملة</option>
          <option value={0}>غير مكتملة</option>
        </select>
      </Table.Td>
      <Table.Td className="text-right">{element.name}</Table.Td>
      <Table.Td className="text-right">{element.description}</Table.Td>
      <Table.Td className="text-right "><span className="text-black-1 text-bold">{element.id}</span> </Table.Td>
    </Table.Tr>
  )) : (
    <Table.Tr key={"333"}> 
      لا يوجد 
    </Table.Tr>
  );
  
  return (
    <div className="py-[2.5rem] px-[13.12rem] w-full h-full rounded-lg ">
      {/* search and sort */}
      <div className="max-w-[63.75rem] mx-auto shadow-table-shadow rounded">
      <div className="bg-white/75 backdrop-blur-[4px] rounded pt-4 w-full  mx-auto flex justify-between items-center pl-[1.5rem] pr-[3.25rem] ">
        <CreateBtn addNewTodoItem={addNewTodoItem} />
        <div className="flex justify-center items-center gap-x-4">
          <SearchBar searchBarItem={searchBar}/>
          <SortBtn sortTodoList={sortTodoList} />
        </div>
      </div>

      <Table.ScrollContainer minWidth={"100%"}  className=" bg-white-0 mt-4">
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
        {/* <Pagination /> */}
      </div>
    </div>
  );
}

export default Display;
