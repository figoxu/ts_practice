// 定义字符串分割选项接口
interface SplitOptions {
  delimiter: string;
  limit?: number;
  trimResult?: boolean;
}

// 定义字符串合并选项接口
interface JoinOptions<T> {
  separator: string;
  transform?: (item: T) => string;
}

// 定义字符串转换类型
type StringTransformer = (input: string) => string;
type StringCase = 'upper' | 'lower' | 'capitalize' | 'camelCase';

/**
 * 字符串处理器类
 * 展示了 TypeScript 的类、泛型、接口等特性
 */
export class StringProcessor {
  /**
   * 高级分割方法
   * @param input 输入字符串
   * @param options 分割选项
   */
  static split(input: string, options: SplitOptions): string[] {
    let result = input.split(options.delimiter);
    
    if (options.limit !== undefined) {
      result = result.slice(0, options.limit);
    }
    
    if (options.trimResult) {
      result = result.map(item => item.trim());
    }
    
    return result;
  }

  /**
   * 泛型合并方法
   * @param items 要合并的数组
   * @param options 合并选项
   */
  static join<T>(items: T[], options: JoinOptions<T>): string {
    const transformedItems = options.transform
      ? items.map(options.transform)
      : items.map(item => String(item));
    
    return transformedItems.join(options.separator);
  }

  /**
   * 字符串转换方法
   * 使用函数组合模式
   */
  static transform(input: string, ...transformers: StringTransformer[]): string {
    return transformers.reduce((result, transformer) => transformer(result), input);
  }

  /**
   * 预定义的字符串转换器
   */
  static readonly transformers: Record<StringCase, StringTransformer> = {
    upper: (str: string) => str.toUpperCase(),
    lower: (str: string) => str.toLowerCase(),
    capitalize: (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    camelCase: (str: string) => {
      return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    }
  };
} 