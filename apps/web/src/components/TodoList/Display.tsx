import { Todo, TodoResponse } from "@/constants/types";
import CreateBtn from "./CreateBtn";
import SearchBar from "./SearchBar";
import SortBtn from "./SortBtn";


interface Props{
  todolist:Todo[];
  addNewTodoItem:(t:Todo)=> void;
}
function Display({todolist , addNewTodoItem}:Props) {
  
  return (
    <div className="py-[2.5rem] px-[13.12rem] w-full h-full rounded-lg">
      {/* search and sort */}
      <div className="bg-white/75 backdrop-blur-[4px] rounded pt-4 w-full max-w-[63.75rem] mx-auto flex justify-between items-center pl-[1.5rem] pr-[3.25rem]">
        <CreateBtn addNewTodoItem={addNewTodoItem}/>
        <div className="flex justify-center items-center gap-x-4 ">
        <SearchBar />
        <SortBtn />
        </div>
        
      </div>
    </div>
  );
}

export default Display;