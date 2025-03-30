export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export type CreateTodoDTO = Omit<Todo, 'id'>;
export type UpdateTodoDTO = Partial<CreateTodoDTO>; 