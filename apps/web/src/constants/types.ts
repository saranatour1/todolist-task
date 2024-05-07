export interface Todo{
  name:string;
  description:string;
  status:boolean;
}


export interface AddItemsInterface{
  addNewTodoItem:(item:Todo) => void;
}