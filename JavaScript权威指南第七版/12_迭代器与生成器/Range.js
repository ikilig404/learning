/**
 * Range 对象表示一个数值范围{x: from <= x <= to}
 * Range 定义了 has() 方法用于测试给定数值是不是该范围的成员
 * Range 是可迭代的，迭代其范围内的所有整数
 */
class Range {
    constructor (from, to) {
        this.from = from
        this.to = to
    }

    // 让 Range 对象像数值的集合一样
    has(x) {
        return typeof x === 'number' && this.from <= x && x <= this.to;
    }

    toString() {
        return `{ x | ${this.from} <= x <= ${this.to} }`;
    }

    // 通过返回一个迭代器对象，让 Range 对象可迭代
    // 注意这个方法的名字是一个特殊符号，不是字符串
    [Symbol.iterator]() {
        // 每个迭代器实例必须相互独立、互不影响地迭代自己的范围
        // 因此需要一个状态变量跟踪迭代的位置。从第一个大于等于
        // from 的整数开始
        let next = Math.ceil(this.from);
        let last = this.to;
        return {
            next() {
                return (next <= last)
                    ? { value: next++ }
                    : { done: true };
            }, 

            [Symbol.iterator]() { return this; }
        }
    }
}