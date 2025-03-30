import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

export const About: React.FC = () => {
  return (
    <Box>
      <VStack spacing={4} align="start">
        <Heading size="lg">关于我们的待办事项应用</Heading>
        <Text>
          这是一个使用 React、TypeScript 和 Chakra UI 构建的现代待办事项应用。
        </Text>
        <Text>
          特点：
        </Text>
        <Text>• 简洁美观的界面设计</Text>
        <Text>• 支持待办事项模板</Text>
        <Text>• 本地存储功能</Text>
        <Text>• 响应式布局</Text>
      </VStack>
    </Box>
  );
}; 