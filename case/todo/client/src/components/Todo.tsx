import React from 'react';
import { Todo } from '@todo/shared';
import {
  Checkbox,
  Text,
  HStack,
  IconButton,
  StackProps
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <HStack spacing={4}>
      <Checkbox
        isChecked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <Text
        flex={1}
        textDecoration={todo.completed ? 'line-through' : 'none'}
      >
        {todo.title}
      </Text>
      <IconButton
        aria-label="Delete todo"
        icon={<DeleteIcon />}
        onClick={() => onDelete(todo.id)}
        size="sm"
        colorScheme="red"
        variant="ghost"
      />
    </HStack>
  );
}; 