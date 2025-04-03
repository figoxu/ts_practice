import { StringProcessor } from '../string_processor';

describe('StringProcessor', () => {
  // split 方法测试套件
  describe('split', () => {
    it('应该使用指定的分隔符分割字符串', () => {
      const input = 'a,b,c';
      const result = StringProcessor.split(input, { delimiter: ',' });
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('应该支持限制返回数组的长度', () => {
      const input = 'a,b,c,d,e';
      const result = StringProcessor.split(input, { delimiter: ',', limit: 3 });
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('应该能够去除结果中的空白字符', () => {
      const input = ' a , b , c ';
      const result = StringProcessor.split(input, { 
        delimiter: ',', 
        trimResult: true 
      });
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('应该正确处理空字符串输入', () => {
      const input = '';
      const result = StringProcessor.split(input, { delimiter: ',' });
      expect(result).toEqual(['']);
    });
  });

  // join 方法测试套件
  describe('join', () => {
    it('应该使用指定的分隔符合并数组', () => {
      const input = ['a', 'b', 'c'];
      const result = StringProcessor.join(input, { separator: ',' });
      expect(result).toBe('a,b,c');
    });

    it('应该支持自定义转换函数', () => {
      const input = ['a', 'b', 'c'];
      const result = StringProcessor.join(input, {
        separator: '-',
        transform: (item) => item.toUpperCase()
      });
      expect(result).toBe('A-B-C');
    });

    it('应该能处理非字符串数组', () => {
      const input = [1, 2, 3];
      const result = StringProcessor.join(input, { separator: '|' });
      expect(result).toBe('1|2|3');
    });

    it('应该正确处理空数组', () => {
      const input: string[] = [];
      const result = StringProcessor.join(input, { separator: ',' });
      expect(result).toBe('');
    });
  });

  // transform 方法测试套件
  describe('transform', () => {
    it('应该正确应用单个转换器', () => {
      const input = 'hello world';
      const result = StringProcessor.transform(
        input,
        StringProcessor.transformers.upper
      );
      expect(result).toBe('HELLO WORLD');
    });

    it('应该正确应用多个转换器', () => {
      const input = 'hello world';
      const result = StringProcessor.transform(
        input,
        StringProcessor.transformers.capitalize,
        (str) => str + '!'
      );
      expect(result).toBe('Hello world!');
    });

    it('应该按顺序应用转换器', () => {
      const input = 'hello world';
      const result = StringProcessor.transform(
        input,
        (str) => str + '!',
        StringProcessor.transformers.upper
      );
      expect(result).toBe('HELLO WORLD!');
    });
  });

  // 预定义转换器测试套件
  describe('transformers', () => {
    const testString = 'hello world';

    it('upper 应该将字符串转换为大写', () => {
      expect(StringProcessor.transformers.upper(testString))
        .toBe('HELLO WORLD');
    });

    it('lower 应该将字符串转换为小写', () => {
      expect(StringProcessor.transformers.lower('HELLO WORLD'))
        .toBe('hello world');
    });

    it('capitalize 应该将首字母大写', () => {
      expect(StringProcessor.transformers.capitalize(testString))
        .toBe('Hello world');
    });

    it('camelCase 应该正确转换为驼峰格式', () => {
      expect(StringProcessor.transformers.camelCase('hello-world'))
        .toBe('helloWorld');
      expect(StringProcessor.transformers.camelCase('Hello World'))
        .toBe('helloWorld');
      expect(StringProcessor.transformers.camelCase('hello_world'))
        .toBe('helloWorld');
    });
  });
}); 