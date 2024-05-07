export interface Todo{
  name:string;
  description:string;
  staus:boolean;
}


export interface AddItemsInterface{
  addNewTodoItem:(item:Todo) => void;
}