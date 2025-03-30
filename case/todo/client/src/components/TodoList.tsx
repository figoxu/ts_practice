import React, { useState, useEffect, ChangeEvent } from 'react';
import { VStack, Input, Button, Box } from '@chakra-ui/react';
import { TodoItem } from './Todo';
import { todoStorage } from '../services/TodoStorage';
import { Todo } from '@todo/shared';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const loadedTodos = await todoStorage.getAll();
    setTodos(loadedTodos);
  };

  const handleAddTodo = async () => {
    if (newTodoTitle.trim()) {
      await todoStorage.add({ title: newTodoTitle, completed: false });
      setNewTodoTitle('');
      await loadTodos();
    }
  };

  const handleToggle = async (id: number) => {
    await todoStorage.toggle(id);
    await loadTodos();
  };

  const handleDelete = async (id: number) => {
    await todoStorage.delete(id);
    await loadTodos();
  };

  return (
    <Box maxW="600px" mx="auto" p={4}>
      <VStack spacing="4" align="stretch">
        <Box>
          <Input
            value={newTodoTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTodoTitle(e.target.value)}
            placeholder="添加新的待办事项..."
            mr={2}
          />
          <Button onClick={handleAddTodo} colorScheme="blue" mt={2}>
            添加
          </Button>
        </Box>
        <VStack spacing="2" align="stretch">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </VStack>
      </VStack>
    </Box>
  );
}; 