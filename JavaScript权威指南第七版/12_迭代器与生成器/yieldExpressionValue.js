function* smallNumbers() {
    console.log("next() 第一次被调用；参数被丢弃");
    let y1 = yield 1;  // y1 == "b"
    console.log("next() 第二次被调用；参数是：", y1);
    let y2 = yield 2;  // y2 == "c"
    console.log("next() 第三次被调用；参数是：", y2);
    let y3 = yield 3;  // y2 == "c"
    console.log("next() 第四次被调用；参数是：", y3);
    return 4;
}

let g = smallNumbers();
console.log("创建了生成器；代码未运行");
let n1 = g.next("a");  // n1.value == 1
console.log("生成器回送", n1.value);
let n2 = g.next("b");  // n2.value == 2
console.log("生成器回送", n2.value);
let n3 = g.next("c");  // n3.value == 3
console.log("生成器回送", n3.value);
let n4 = g.next("d");  // n4 == { value: 4, done: true }
console.log("生成器返回", n4.value);