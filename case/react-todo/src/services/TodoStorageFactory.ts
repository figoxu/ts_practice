import { TodoStorage } from './TodoStorage';
import { TodoStorageLocal } from './TodoStorageLocal';

export class TodoStorageFactory {
  private static instance: TodoStorage | null = null;

  static getInstance(): TodoStorage {
    if (!TodoStorageFactory.instance) {
      TodoStorageFactory.instance = new TodoStorageLocal();
    }
    return TodoStorageFactory.instance;
  }
} 