import { Button, Menu, Popover, rem } from "@mantine/core";
import Image from "next/image";
import sort from "../../../public/sort.svg"

interface Props{
  sortTodoList:(i:number)=> void;
}
function SortBtn({sortTodoList}:Props) {

  const options =[
    {name:"عرض الجميع", opt:1},
    {name:"عرض المكتمل", opt:2},
    {name:"عرض الغير مكتمل", opt:3}
  ]

  const setSorter= (i:number)=>{
    sortTodoList(i)
  }
  return (
  <Menu shadow="md" width={200} classNames={{label:" text-red"}}>
      <Menu.Target>
        <button className="rounded-[0.375rem] border border-blue-1 py-2 px-3 grid place-content-center">
          <Image src={sort} alt="sort"/>
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        {options.map((item,index)=> <Menu.Item onClick={()=> setSorter(item.opt)} key={index}> <span className="w-full text-right">{item.name}</span></Menu.Item>)}
      </Menu.Dropdown>
    </Menu>
  );
}

export default SortBtn;