import {
  formatDate,
  calculateDateDifference,
  addDays,
  isDateInRange,
  DateFormatOptions
} from '../date-operations';

describe('日期操作测试', () => {
  describe('formatDate', () => {
    it('应该正确格式化日期', () => {
      const testDate = new Date(2024, 3, 3); // 2024-04-03
      const options: DateFormatOptions = { format: 'yyyy-MM-dd' };
      expect(formatDate(testDate, options)).toBe('2024-04-03');
    });

    it('应该支持不同的日期格式', () => {
      const testDate = new Date(2024, 3, 3);
      expect(formatDate(testDate, { format: 'yyyy/MM/dd' })).toBe('2024/04/03');
      expect(formatDate(testDate, { format: 'dd/MM/yyyy' })).toBe('03/04/2024');
      expect(formatDate(testDate, { format: 'MM/dd/yyyy' })).toBe('04/03/2024');
    });

    it('应该正确包含时间', () => {
      const testDate = new Date(2024, 3, 3, 14, 30); // 2024-04-03 14:30
      const options: DateFormatOptions = { format: 'yyyy-MM-dd', includeTime: true };
      expect(formatDate(testDate, options)).toBe('2024-04-03 14:30');
    });
  });

  describe('calculateDateDifference', () => {
    it('应该正确计算日期差异', () => {
      const date1 = new Date(2024, 3, 1);
      const date2 = new Date(2024, 3, 3);
      const difference = calculateDateDifference(date1, date2);
      expect(difference.days).toBe(2);
      expect(difference.hours).toBe(0);
      expect(difference.minutes).toBe(0);
    });

    it('应该处理包含时间的日期差异', () => {
      const date1 = new Date(2024, 3, 1, 10, 0);
      const date2 = new Date(2024, 3, 1, 14, 30);
      const difference = calculateDateDifference(date1, date2);
      expect(difference.days).toBe(0);
      expect(difference.hours).toBe(4);
      expect(difference.minutes).toBe(30);
    });
  });

  describe('addDays', () => {
    it('应该正确添加天数', () => {
      const startDate = new Date(2024, 3, 1);
      const resultDate = addDays(startDate, 5);
      expect(resultDate.getDate()).toBe(6);
      expect(resultDate.getMonth()).toBe(3);
      expect(resultDate.getFullYear()).toBe(2024);
    });

    it('应该正确处理月份转换', () => {
      const startDate = new Date(2024, 3, 29);
      const resultDate = addDays(startDate, 2);
      expect(resultDate.getDate()).toBe(1);
      expect(resultDate.getMonth()).toBe(4);
    });
  });

  describe('isDateInRange', () => {
    it('应该正确判断日期是否在范围内', () => {
      const startDate = new Date(2024, 3, 1);
      const endDate = new Date(2024, 3, 10);
      const testDate = new Date(2024, 3, 5);
      
      expect(isDateInRange(testDate, startDate, endDate)).toBe(true);
      expect(isDateInRange(new Date(2024, 2, 31), startDate, endDate)).toBe(false);
      expect(isDateInRange(new Date(2024, 3, 11), startDate, endDate)).toBe(false);
    });

    it('应该包含边界日期', () => {
      const startDate = new Date(2024, 3, 1);
      const endDate = new Date(2024, 3, 10);
      
      expect(isDateInRange(startDate, startDate, endDate)).toBe(true);
      expect(isDateInRange(endDate, startDate, endDate)).toBe(true);
    });
  });
}); 