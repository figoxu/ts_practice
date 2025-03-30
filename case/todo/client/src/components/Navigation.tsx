import React from 'react';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  return (
    <Box bg="gray.100" px={4} py={4}>
      <Flex maxW="container.md" mx="auto">
        <Link as={RouterLink} to="/" fontSize="lg" fontWeight="bold" mr={6}>
          本地待办事项
        </Link>
        <Link as={RouterLink} to="/remote" mr={6}>
          远程待办事项
        </Link>
        <Spacer />
        <Link as={RouterLink} to="/about">
          关于
        </Link>
      </Flex>
    </Box>
  );
}; 