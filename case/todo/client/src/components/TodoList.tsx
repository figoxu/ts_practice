import React, { useState, useEffect } from 'react';
import {
  VStack,
  Heading,
  Input,
  Button,
  Box,
  useToast,
  Select,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react';
import { Todo } from '../types/todo';
import { TodoItem } from './Todo';
import { TodoStorageFactory, StorageType } from '../services/TodoStorageFactory';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [storageType, setStorageType] = useState<StorageType>('local');
  const toast = useToast();

  const todoStorage = TodoStorageFactory.getInstance().getStorage(storageType);

  useEffect(() => {
    loadTodos();
  }, [storageType]);

  const loadTodos = async () => {
    try {
      const loadedTodos = await todoStorage.getAll();
      setTodos(loadedTodos);
    } catch (error) {
      toast({
        title: '加载待办事项失败',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const addTodo = async () => {
    if (!newTodoTitle.trim()) {
      toast({
        title: '请输入待办事项',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    try {
      await todoStorage.add({
        title: newTodoTitle,
        description: '',
        completed: false,
      });
      setNewTodoTitle('');
      await loadTodos();
    } catch (error) {
      toast({
        title: '添加待办事项失败',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      await todoStorage.toggle(id);
      await loadTodos();
    } catch (error) {
      toast({
        title: '更新待办事项失败',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoStorage.delete(id);
      await loadTodos();
    } catch (error) {
      toast({
        title: '删除待办事项失败',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} width="100%">
      <Heading>待办事项列表</Heading>

      <RadioGroup onChange={(value: StorageType) => setStorageType(value)} value={storageType}>
        <Stack direction="row">
          <Radio value="local">本地存储</Radio>
          <Radio value="http">HTTP存储</Radio>
        </Stack>
      </RadioGroup>
      
      <Box width="100%">
        <VStack spacing={4}>
          <Input
            placeholder="新建待办事项"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <Button colorScheme="blue" onClick={addTodo} width="100%">
            添加待办事项
          </Button>
        </VStack>
      </Box>

      <VStack spacing={2} width="100%">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </VStack>
    </VStack>
  );
}; 