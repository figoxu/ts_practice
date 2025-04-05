import { map, filter, reduce } from '../array-operations';

describe('数组操作函数测试', () => {
    describe('map 函数', () => {
        it('应该正确转换数字数组', () => {
            const numbers = [1, 2, 3, 4, 5];
            const doubled = map(numbers, (n) => n * 2);
            expect(doubled).toEqual([2, 4, 6, 8, 10]);
        });

        it('应该正确转换字符串数组', () => {
            const words = ['hello', 'world'];
            const upperCased = map(words, (str) => str.toUpperCase());
            expect(upperCased).toEqual(['HELLO', 'WORLD']);
        });
    });

    describe('filter 函数', () => {
        it('应该正确过滤数字数组', () => {
            const numbers = [1, 2, 3, 4, 5, 6];
            const evenNumbers = filter(numbers, (n) => n % 2 === 0);
            expect(evenNumbers).toEqual([2, 4, 6]);
        });

        it('应该正确过滤字符串数组', () => {
            const words = ['hello', 'world', 'typescript', 'js'];
            const longWords = filter(words, (word) => word.length > 4);
            expect(longWords).toEqual(['hello', 'world', 'typescript']);
        });
    });

    describe('reduce 函数', () => {
        it('应该正确计算数组总和', () => {
            const numbers = [1, 2, 3, 4, 5];
            const sum = reduce(numbers, (acc, curr) => acc + curr, 0);
            expect(sum).toBe(15);
        });

        it('应该正确连接字符串', () => {
            const words = ['Hello', 'World'];
            const sentence = reduce(words, (acc, curr) => `${acc} ${curr}`, '').trim();
            expect(sentence).toBe('Hello World');
        });

        it('应该使用不同的累加器类型', () => {
            const numbers = [1, 2, 3, 4, 5];
            const numberStrings = reduce(
                numbers,
                (acc, curr) => [...acc, curr.toString()],
                [] as string[]
            );
            expect(numberStrings).toEqual(['1', '2', '3', '4', '5']);
        });
    });
}); 