import React from 'react';
import { Box, Checkbox, IconButton, Text, HStack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <Box
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      width="100%"
      bg="white"
    >
      <HStack spacing={4}>
        <Checkbox
          isChecked={todo.completed}
          onChange={onToggle}
          size="lg"
        />
        <Box flex="1">
          <Text
            textDecoration={todo.completed ? 'line-through' : 'none'}
            color={todo.completed ? 'gray.500' : 'black'}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Text fontSize="sm" color="gray.600">
              {todo.description}
            </Text>
          )}
        </Box>
        <IconButton
          aria-label="删除待办事项"
          icon={<DeleteIcon />}
          onClick={onDelete}
          colorScheme="red"
          variant="ghost"
        />
      </HStack>
    </Box>
  );
}; 