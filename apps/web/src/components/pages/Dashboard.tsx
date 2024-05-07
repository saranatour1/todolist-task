'use client'
import NavBar from '@/components/Navigation/NavBar';
import { useEffect, useState } from 'react';
import NotFound from '@/components/TodoList/NotFound';
import Display from '@/components/TodoList/Display';
import { Todo, TodoResponse } from '@/constants/types';


function Dashboard() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [options, setOptions] = useState({page:1, limit:10})
  const [total, setTotal] =useState(0)

  useEffect(()=>{
    const getTodoLists = async() =>{
      try{
        const queryParams = new URLSearchParams();
        queryParams.set("page", options.page.toString())
        queryParams.set("limit", options.limit.toString())
        const response = await fetch(`/api/todolist?${queryParams}`)
        // console.log(response)
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
      const result = await response.json()
      if(result){
        setTodoList([
          ...todoList,
          result["todo"]
        ])
      }
      // console.log(result)
    }catch(e){
      console.log(e)
    }
  }
  
  const editItem = async (item: Todo) => {
    try {
      const response = await fetch(`/api/todolist`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
  
      const updatedItem = await response.json();
  
      setTodoList(todoList.map(todo =>
        todo.id === updatedItem["todo"].id ? updatedItem["todo"] : todo
      ));
      
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async(id:number) =>{
    try {
      const response = await fetch(`/api/todolist?id=${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
  
      const updatedItem = await response.json();
      
      setTodoList(todoList?.filter(todo =>
        todo.id !== id
      ));
    } catch (e) {
      console.log(e);
    }
  }

  
  const sortTodoList = async (option: number) => {
    let sortedTodos: Todo[] = [];
  
    if (option === 2) {
      // true before false
      sortedTodos = [...todoList].sort((a, b) => (a.status ? -1 : 1));
    } else if (option === 3) {
      // false before true
      sortedTodos = [...todoList].sort((a, b) => (a.status ? 1 : -1));
    } else if (option === 1) {
      // sort by id
      sortedTodos = [...todoList].sort((a,b) => a.id - b.id);
    }
    setTodoList(sortedTodos);
  };
  

  return (
    <main className="w-full h-full max-w-full min-h-screen bg-white-1">
      <NavBar />
      {todoList?.length ? <Display sortTodoList={sortTodoList} todolist={todoList} addNewTodoItem={addNewTodoItem} editItem={editItem} deleteItem={deleteItem}/>:<NotFound addNewTodoItem={addNewTodoItem}/>}
    </main>
  );
}

export default Dashboard;