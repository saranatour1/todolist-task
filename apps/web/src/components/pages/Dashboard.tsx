'use client'
import NavBar from '@/components/Navigation/NavBar';
import { useEffect, useState } from 'react';
import NotFound from '@/components/TodoList/NotFound';
import Display from '@/components/TodoList/Display';
import { Todo } from '@/constants/types';


function Dashboard() {
  const [todoList, setTodoList] = useState<Todo[]>();
  const [options, setOptions] = useState({page:1, limit:10})

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
      console.log(response.json());
    }catch(e){
      console.log(e)
    }
  }
  
  return (
    <main className="w-full h-full max-w-full min-h-screen">
      <NavBar />
      {todoList?.length ? <Display />:<NotFound addNewTodoItem={addNewTodoItem}/>}
    </main>
  );
}

export default Dashboard;