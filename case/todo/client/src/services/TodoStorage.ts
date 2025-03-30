import { Todo, CreateTodoDTO } from '@todo/shared';

export interface TodoStorage {
  getAll(): Promise<Todo[]>;
  add(todo: CreateTodoDTO): Promise<Todo>;
  delete(id: number): Promise<void>;
  toggle(id: number): Promise<Todo>;
}

export class ApiTodoStorage implements TodoStorage {
  private apiUrl = 'http://localhost:3001/api/todos';

  async getAll(): Promise<Todo[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  async add(todo: CreateTodoDTO): Promise<Todo> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  }

  async delete(id: number): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });
  }

  async toggle(id: number): Promise<Todo> {
    const response = await fetch(`${this.apiUrl}/${id}/toggle`, {
      method: 'PUT',
    });
    return response.json();
  }
}

export const todoStorage = new ApiTodoStorage(); 