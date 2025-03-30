import React from 'react';
import { ChakraProvider, Container, VStack } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { About } from './pages/About';
import { TodoLocal } from './pages/TodoLocal';
import { TodoRemote } from './pages/TodoRemote';

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Navigation />
        <Container maxW="container.md" py={8}>
          <VStack spacing={8}>
            <Routes>
              <Route path="/" element={<TodoLocal />} />
              <Route path="/remote" element={<TodoRemote />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </VStack>
        </Container>
      </ChakraProvider>
    </Router>
  );
}

export default App; 