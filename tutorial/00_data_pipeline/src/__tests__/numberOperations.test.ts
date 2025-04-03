import { sum, average, max, min } from '../numberOperations';

describe('数字操作测试', () => {
    describe('sum 函数', () => {
        it('应该正确计算数组元素的总和', () => {
            expect(sum([1, 2, 3, 4, 5])).toBe(15);
            expect(sum([-1, 1])).toBe(0);
            expect(sum([0])).toBe(0);
            expect(sum([])).toBe(0);
        });
    });

    describe('average 函数', () => {
        it('应该正确计算数组元素的平均值', () => {
            expect(average([1, 2, 3, 4, 5])).toBe(3);
            expect(average([1, 1, 1])).toBe(1);
        });

        it('当数组为空时应该抛出错误', () => {
            expect(() => average([])).toThrow('Cannot calculate average of empty array');
        });
    });

    describe('max 函数', () => {
        it('应该正确找出数组中的最大值', () => {
            expect(max([1, 2, 3, 4, 5])).toBe(5);
            expect(max([-1, 0, 1])).toBe(1);
        });

        it('当数组为空时应该抛出错误', () => {
            expect(() => max([])).toThrow('Cannot find maximum of empty array');
        });
    });

    describe('min 函数', () => {
        it('应该正确找出数组中的最小值', () => {
            expect(min([1, 2, 3, 4, 5])).toBe(1);
            expect(min([-1, 0, 1])).toBe(-1);
        });

        it('当数组为空时应该抛出错误', () => {
            expect(() => min([])).toThrow('Cannot find minimum of empty array');
        });
    });
}); 