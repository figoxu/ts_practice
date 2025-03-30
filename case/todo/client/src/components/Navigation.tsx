import React from 'react';
import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const linkStyle = {
    fontSize: 'lg',
    fontWeight: 'medium',
    _hover: { textDecoration: 'none' }
  };

  const activeStyle = {
    color: 'blue.500',
    fontWeight: 'bold'
  };

  return (
    <Box bg="gray.100" px={4} py={4}>
      <Flex maxW="container.md" mx="auto">
        <Link
          as={NavLink}
          to="/"
          {...linkStyle}
          _activeLink={activeStyle}
          end
          mr={6}
        >
          本地待办事项
        </Link>
        <Link
          as={NavLink}
          to="/remote"
          {...linkStyle}
          _activeLink={activeStyle}
          mr={6}
        >
          远程待办事项
        </Link>
        <Spacer />
        <Link
          as={NavLink}
          to="/about"
          {...linkStyle}
          _activeLink={activeStyle}
        >
          关于
        </Link>
      </Flex>
    </Box>
  );
}; 