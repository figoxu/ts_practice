export interface Todo {
  id:   string;
  title: string;
  description: string;
  completed: boolean;
}

export type CreateTodoDTO = Omit<Todo, 'id'>;
export type UpdateTodoDTO = Partial<CreateTodoDTO>; 