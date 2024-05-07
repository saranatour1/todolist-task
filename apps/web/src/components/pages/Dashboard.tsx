'use client'
import NavBar from '@/components/Navigation/NavBar';
import { useEffect, useState } from 'react';
import NotFound from '@/components/TodoList/NotFound';
import Display from '@/components/TodoList/Display';
import { Todo, TodoResponse } from '@/constants/types';


function Dashboard() {
  const [todoList, setTodoList] = useState<Todo[]>();
  const [options, setOptions] = useState({page:1, limit:10})
  const [total, setTotal] =useState(0)

  useEffect(()=>{
    const getTodoLists = async() =>{
      try{
        const queryParams = new URLSearchParams();
        queryParams.set("page", options.page.toString())
        queryParams.set("limit", options.limit.toString())
        const response = await fetch(`/api/todolist?${queryParams}`)
        console.log(response)
        if(response.status === 404){
          setTodoList([]);
        }else{
          // Todo: set the todo lists
          const result  = await response.json()
          setTodoList(result["todos"])
          setTotal(result["total"])
          console.log(result['todos'])
        }
      }catch(e){
        console.log(e)
      }
    }
    getTodoLists();
  },[])

  const addNewTodoItem = async(item:Todo)=>{
    try{
      const response = await fetch(`/api/todolist`,{
        method:"post",
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(item),
      })

      console.log(await response.json());
    }catch(e){
      console.log(e)
    }
  }
  
  
  return (
    <main className="w-full h-full max-w-full min-h-screen bg-white-1">
      <NavBar />
      {todoList?.length ? <Display todolist={todoList} addNewTodoItem={addNewTodoItem} />:<NotFound addNewTodoItem={addNewTodoItem}/>}
    </main>
  );
}

export default Dashboard;