/**
 * 日期操作工具类
 */

// 日期格式化选项类型
export type DateFormatOptions = {
  format: 'yyyy-MM-dd' | 'yyyy/MM/dd' | 'dd/MM/yyyy' | 'MM/dd/yyyy';
  includeTime?: boolean;
};

// 日期差异返回类型
export type DateDifference = {
  days: number;
  hours: number;
  minutes: number;
};

/**
 * 格式化日期
 * @param date 要格式化的日期
 * @param options 格式化选项
 */
export function formatDate(date: Date, options: DateFormatOptions): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  let formatted = options.format
    .replace('yyyy', year.toString())
    .replace('MM', month)
    .replace('dd', day);
    
  if (options.includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    formatted += ` ${hours}:${minutes}`;
  }
  
  return formatted;
}

/**
 * 计算两个日期之间的差异
 * @param date1 第一个日期
 * @param date2 第二个日期
 */
export function calculateDateDifference(date1: Date, date2: Date): DateDifference {
  const diffMs = Math.abs(date2.getTime() - date1.getTime());
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
}

/**
 * 添加天数到指定日期
 * @param date 原始日期
 * @param days 要添加的天数
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * 检查日期是否在指定范围内
 * @param date 要检查的日期
 * @param startDate 开始日期
 * @param endDate 结束日期
 */
export function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean {
  return date >= startDate && date <= endDate;
} 