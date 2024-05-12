export interface Todo {
  name: string;
  description: string;
  status: boolean;
  id: string | number;
  userId: string | number;
}

export interface AddItemsInterface {
  addNewTodoItem: (item: Partial<Todo>| Todo) => void;
}

export interface TodoResponse extends Todo {
  id: string | number;
  userId: string | number;
}
