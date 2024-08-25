/**
 * 一个异步可迭代队列类。使用 enqueue() 添加值，
 * 使用 dequeue() 移除值。dequeue() 返回一个期约，
 * 这意味着，值可以在入队之前出队。这个类实现了
 * [Symbol.asyncIterator] 和 next()，因而可以与
 * for/await 循环一起配合使用（这个循环在调用
 * close() 方法前不会终止）
 */
class AsyncQueue {
    constructor() {
        // 已经入队尚未出队的值保存在这里
        this.values = [];
        // 如果期约出队时它们对应的值尚未入队，
        // 就把那些期约的解决方法保存在这里
        this.resolvers = [];
        this.closed = false;
    }

    enqueue(value) {
        if (this.closed) {
            throw new Error("AsyncQueue closed");
        }
        if (this.resolvers.length > 0) {
            // 如果这个值已经有对应的期约，则解决该期约
            const resolve = this.resolvers.shift();
            resolve(value);
        }
        else {
            // 否则，让它去排队
            this.values.push(value);
        }
    }

    dequeue() {
        if (this.values.length > 0) {
            // 如果有一个排队的值，为它返回一个解决期约
            const value = this.values.shift();
            return Promise.resolve(value);
        }
        else if (this.closed) {
            // 如果没有排队的值，而且队列已关闭，
            // 返回一个解决为 EOS（流终止）标记的期约
            return Promise.resolve(AsyncQueue.EOS);
        }
        else {
            // 否则，返回一个未解决的期约，
            // 将解决方法排队，以便后面使用
            return new Promise((resolve) => { this.resolvers.push(resolve); });
        }
    }

    close() {
        // 一旦关闭，任何值都不能再入队
        // 因此以 EOS 标记解决所有待决期约
        while(this.resolvers.length > 0) {
            this.resolvers.shift()(AsyncQueue.EOS);
        }
        this.closed = true;
    }

    // 定义这个方法，让这个类成为异步可迭代对象
    [Symbol.asyncIterator]() { return this; }

    // 定义这个方法，让这个类成为异步迭代器
    // dequeue() 返回的期约会解决为一个值，
    // 或者在关闭时解决为 EOS 标记。这里，我们
    // 需要返回一个解决为迭代器结果对象的期约
    next() {
        return this.dequeue.then(value => (value === AsyncQueue.EOS) 
                                ? { value: undefined, done: true } 
                                : { value: value, done: false });
    }
}

// dequeue() 方法返回的标记值，在关闭时表示“流终止”
AsyncQueue.EOS = Symbol("end-of-stream");

// 把指定文档元素上指定类型的事件推入一个AsyncQueue对象，
// 然后返回这个队列，以便将其作为事件流来使用
function eventStream(elt, type) {
    const q = new AsyncQueue();  // 创建一个队列
    elt.addEventListener(type, e => q.enqueue(e));  // 入队事件
    return q;
}

async function handleKeys() {
    // 取得一个 keypress 事件流，对每个事件都执行一次循环
    for await(const event of eventStream(document, "keypress")) {
        console.log(event.key);
    }       
}