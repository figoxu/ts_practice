import React from 'react';
import { ChakraProvider, Container, Heading, VStack } from '@chakra-ui/react';
import { TodoList } from './components/TodoList';

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8}>
          <Heading>待办事项列表</Heading>
          <TodoList />
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App; 