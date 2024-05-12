"use client";
import NavBar from "@/components/Navigation/NavBar";
import { useEffect, useState } from "react";
import NotFound from "@/components/TodoList/NotFound";
import Display from "@/components/TodoList/Display";
import { Todo, TodoResponse } from "@/constants/types";

function Dashboard() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<Todo[]>([]);
  const [searchKeyworkd, setSearchKeyworkd] = useState("");
  const [found, setFound] = useState(false);
  const [options, setOptions] = useState({ page: 1, limit: 10 });
  const [total, setTotal] = useState(0);
  let timeoutID:NodeJS.Timeout | string | number | undefined = undefined;

  useEffect(() => {
    const getTodoLists = async () => {
      try {
        const queryParams = new URLSearchParams();
        queryParams.set("page", options.page.toString());
        queryParams.set("limit", options.limit.toString());
        const response = await fetch(`/api/todolist?${queryParams}`);
        // console.log(response)
        if (response.status === 404) {
          setTodoList([]);
        } else {
          // Todo: set the todo lists
          const result = await response.json();
          setTodoList(result["todos"]);
          setTotal(result["total"]);
          // console.log(result['todos'])
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTodoLists();
  }, []);

  const addNewTodoItem = async (item: Partial<Todo>|Todo) => {
    try {
      const response = await fetch(`/api/todolist`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      const result = await response.json();
      if (result) {
        setTodoList([...todoList, result["todo"]]);
      }
      // console.log(result)
    } catch (e) {
      console.log(e);
    }
  };

  const editItem = async (item: Partial<Todo>|Todo) => {
    try {
      const response = await fetch(`/api/todolist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();

      setTodoList(
        todoList.map((todo) =>
          todo.id === updatedItem["todo"].id ? updatedItem["todo"] : todo,
        ),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/todolist?id=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      const updatedItem = await response.json();

      setTodoList(todoList?.filter((todo) => todo.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

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
      sortedTodos = [...todoList].sort((a, b) => (a.id as number) - (b.id as number));
    }
    setTodoList(sortedTodos);
  };

  const searchBar = (q: string) => {
    // "/api/todolist/search?q=${dd}"
    setSearchKeyworkd(q);

    try {
      if (timeoutID) {
        clearTimeout(timeoutID);
        timeoutID = undefined;
      }

      timeoutID = setTimeout(async () => {
        // make fetch request here
        try {
          const request = await fetch(`/api/todolist/search?q=${q}`);
          const response = await request.json();
          if (request.status === 404) {
            setFiltered([]);
          } else {
            setFiltered(response["todos"]);
          }
        } catch (e) {
          console.log(e);
        }
        // ensure to clear timeoutID here too
        timeoutID =  undefined;
      }, 1500);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="w-full h-full max-w-full min-h-screen bg-white-1">
      <NavBar />
      {todoList?.length ? (
        <Display
          searchBar={searchBar}
          sortTodoList={sortTodoList}
          todolist={searchKeyworkd.length ? filtered : todoList}
          addNewTodoItem={addNewTodoItem}
          editItem={editItem}
          deleteItem={deleteItem}
        />
      ) : (
        <NotFound addNewTodoItem={addNewTodoItem} />
      )}
    </main>
  );
}

export default Dashboard;
