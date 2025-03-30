export interface TodoItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoStorage {
  getAll(): Promise<TodoItem[]>;
  add(text: string): Promise<TodoItem>;
  delete(id: number): Promise<void>;
  toggle(id: number): Promise<void>;
} 