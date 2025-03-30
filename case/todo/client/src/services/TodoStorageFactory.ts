import { TodoStorage } from './TodoStorage';
import { TodoStorageLocal } from './TodoStorageLocal';
import { TodoStorageHttp } from './TodoStorageHttp';

export type StorageType = 'local' | 'http';

export class TodoStorageFactory {
  private static instance: TodoStorageFactory;
  private storageInstances: Map<StorageType, TodoStorage>;

  private constructor() {
    this.storageInstances = new Map();
    this.storageInstances.set('local', new TodoStorageLocal());
    this.storageInstances.set('http', new TodoStorageHttp());
  }

  public static getInstance(): TodoStorageFactory {
    if (!TodoStorageFactory.instance) {
      TodoStorageFactory.instance = new TodoStorageFactory();
    }
    return TodoStorageFactory.instance;
  }

  public getStorage(type: StorageType): TodoStorage {
    const storage = this.storageInstances.get(type);
    if (!storage) {
      throw new Error(`Storage type ${type} not found`);
    }
    return storage;
  }
} 