# JavaScript 简介

JavaScript 是 Web 编程语言。绝大多数网站都使用 JavaScript，所有现代 Web 浏览器(无论是桌面、平板还是手机浏览器，书中以后统称为浏览器）都包含 JavaScript 解释器，这让 JavaScript 成为有史以来部署最广泛的编程语言。过去十年，Node.js 让浏览器之外的 JavaScript 编程成为可能，Node 的巨大成功意味着 JavaScript 如今也是软件开发者最常用的编程语言。无论你是从头开始，还是已经在工作中使用 JavaScript，本书都能帮你掌握这门语言。

如果你已经熟悉其他编程语言，那有必要知道 JavaScript 是一门高级、动态、解释型编程语言，非常适合面向对象和函数式编程风格。JavaScript 的变量是无类型的，它的语法大致与 Java 相仿，但除此之外这两门语言之间没有任何关系。JavaScript 从 Scheme 借鉴了一类（first class）函数，从不太知名的 Self 借鉴了基于原型的继承。但要阅读本书或学习 JavaScript 不需要了解这些语言，也不必熟悉这些术语。

JavaScript 这个名字相当有误导性。除了表面上语法相似，它与 Java 是完全不同的两门编程语言。JavaScript 经历了很长时间才从一门脚本语言成长为一门健壮高效的通用语言，适合开发代码量巨大的重要软件工程和项目。

> ​																JavaScript：名字、版本和模式
>
> JavaScript 是 Netscape 在 Web 诞生初期创造的。严格来讲，JavaScript 是经 Sun Microsystems（现Oracle）授权使用的一个注册商标，用于描述 Netscape（现 Mozilla）对这门语言的实现。Netscape 将这门语言提交给 Ecma International 进行标准化，由于商标问题，这门语言的标准版本沿用了别扭的名字ECMAScript 。实践中，大家仍然称这门语言为 JavaScript 。本书在讨论这门语言的标准及版本时使用 ECMAScript 及其缩写 ES 。
>
> 2010 年以来，几乎所有浏览器都支持 ECMAScript 标准第 5 版。本书以 ES5 作为兼容性基准，不再讨论这门语言的更早版本。ES6 发布于2015年，增加了重要的新特性（包括类和模块语法）。这些新特性把 JavaScript 从一门脚本语言转变为一门适合大规模软件工程的严肃、通用语言。从 ES6 开始，ECMAScript 规范改为每年发布一次，语言的版本也以发布的年份来标识（ES2016、ES2017、ES2018、ES2019和ES2020）。
>
> 随着 JavaScript 的发展，语言设计者也在尝试纠正早期（ES5 之前）版本中的缺陷。为了保证向后兼容，无论一个特性的问题有多严重，也不能把它删除。但在 ES5 及之后，程序可以选择切换到 JavaScript 的严格模式。在这种模式下，一些早期的语言错误会得到纠正。本书 5.6.3 节将介绍切换到这种模式使用的` use strict` 指令。该节也会总结传统 JavaScript 与严格 JavaScript 的区别。在 ES6 及之后，使用新语言特性经常会隐式触发严格模式。例如，如果使用 ES6 的 class 关键字或者创建 ES6 模块，类和模块中的所有代码都会自动切换到严格模式。在这些上下文中，不能使用老旧、有缺陷的特性。本书会介绍 JavaScript 的传统特性，但会细心地指出它们在严格模式下无法使用。

为了好用，每种语言都必须有一个平台或标准库，用于执行包括基本输人和输出在内的基本操作。核心 JavaScript 语言定义了最小限度的 API，可以操作数值、文本、数组、集合、映射等，但不包含任何输入和输出功能。输人和输出（以及更复杂的特性，如联网、存储和图形处理）是内嵌 JavaScript 的“宿主环境”的责任。

浏览器是 JavaScript 最早的宿主环境，也是 JavaScript 代码最常见的运行环境。浏览器环境允许 JavaScript 代码从用户的鼠标和键盘或者通过发送HTTP请求获取输入，也允许 JavaScript 代码通过 HTML 和 CSS 向用户显示输出。

2010 年以后，JavaScript 代码又有了另一个宿主环境。与限制 JavaScript 只能使用浏览器提供的 API 不同，Node 给予了 JavaScript 访问整个操作系统的权限，允许 JavaScript 程序读写文件、通过网络发送和接收数据，以及发送和处理 HTTP 请求。Node 是实现 Web 服务器的一种流行方式，也是编写可以替代 shell 脚本的简单实用脚本的便捷工具。

本书大部分内容聚焦 JavaScript 语言本身。第 11 章讲述 JavaScript 标准库，第 15 章介绍浏览器宿主环境，第 16 章介绍 Node 宿主环境。

全书首先从底层基础讲起，然后逐步过渡到高级及更高层次的抽象。这些章节的安排多多少少考虑了阅读的先后次序。不过学习一门新语言不可能是一个线性的过程，对一门语言的描述也不可能是线性的。毕竟每个语言特性都可能与其他特性有关系。本书的交叉引用非常多，有的指向前面的章节，有的指向后面的章节。本章会先快速地过一遍这门语言，介绍一些对理解后续章节的深入剖析有帮助的关键特性。如果你是一名 JavaScript 程序员，可以跳过这一章（但在跳过之前，读一读本章末尾的示例 1-1 应该会让你很开心）。

## 1 探索 JavaScript

学习一门新编程语言，很重要的是尝试书中的示例，然后修改这些示例并再次运行，以验证自己对这门语言的理解。为此，你需要一个 JavaScript 解释器。

要尝试少量 JavaScript 代码，最简单的方式就是打开浏览器的 Web 开发者工具（按 F12、Ctrl+Shift+I 或Command+Option+I)，然后选择 Console（控制台）标签页。之后就可以在提示符后面输人代码，并在输入的同时看到结果。浏览器开发者工具经常以一组面板的形式出现在浏览器窗口底部或右侧，不过也可以把它们拆分为独立的窗口（如图1-1所示)，这样通常更加方便。

![image-20240505235246784](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/blog/image-20240505235246784.png)

尝试 JavaScript 代码的另一种方式是下载并安装 Node（下载地址https://nodejs.org/）。安装完 Node 之后，可以打开终端窗口，然后输入 node 并回车，像下面这样开始交互式 JavaScript 会话：

![image-20240505235804306](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/blog/image-20240505235804306.png)

## 2 Hello World

当需要试验更长的代码块时，这种以行为单位的交互环境可能就不合适了。此时可能需要使用一个文本编辑器来编写代码。写完之后，可以把 JavaScript 代码复制粘贴到 JavaScript 控制台或 Node 会话。或者，可以把代码保存成一个文件（保存 JavaScript 代码的文件通常使用扩展名js)，再使用 Node 来运行这个 JavaScript 代码文件：

```shell
node snippet.js
```

如果像这样在非交互模式下使用 Node，那它不会自动打印所有运行的代码的值，因此你需要自己打印。可以使用`console.log()`函数在终端窗口或在浏览器开发者工具的控制台中显示文本和其他 JavaScript 值。例如，如果你创建一个 hello.js 文件，其中包含这行代码：

```js
console.log("Hello World!");
```

并使用`node hello.js`来执行这个文件，可以看到打印出的消息 “HelloWorld!”。

如果你想在浏览器的 JavaScript 控制台看到同样的消息，则需要创建一个新文件，例如叫 hello.html，然后把以下内容放进去：

```html
<script src="hello.js"></script>
```

然后像下面这样在浏览器中使用`file://URL`加载`hello.html`：

```js
file:///Users/username/javascript/hello.html
```

打开开发者工具窗口，就可以在控制台中看到这个问候了。



## 3 JavaScript 之旅

本节通过代码示例对 JavaScript 语言做一个简单介绍。在本章之后，我们会深人 JavaScript 的最底层。第 2 章将解释 JavaScript 注释、分号和 Unicode 字符集。第 3 章会更有意思一些，将解释 JavaScript 变量以及可以赋给这些变量的值。

下面我们来看一些例子，其中包含了第 2 章和第 3 章的重点内容。

```js
// 双斜杠后面的这些文字都是注释
// 一定要认真阅读注释：注释是对JavaScript代码的解释

// 变量是一个代表值的名字
// 变量要使用let关键字声明
let x; // 声明一个名叫x的变量

// 可以使用一个等号为变量赋值
x = 0; // 现在变量x的值就是0
x // =>0：变量求值的结果就是它的值

// JavaScript支持几种不同的值
x = 1; // 数值
x = 0.01; // 数值可以是整数或实数
x = "hello world"; // 文本字符串包含在引号中
x = 'JavaScript'; // 单引号也用于界定字符串
x = true; // 布尔值
x = false; // 另一个布尔值
x = null; // null是一个特殊值，意思是“没有值”
X = undefined; // undefined也是一个特殊值，与null类似
```

JavaScript 程序可以操作的另外两个非常重要的类型是对象和数组，分别将在第6章和第7章中介绍。不过，因为它们实在太重要了，所以在那两章之前你也会多次看到它们。

```js
// 对象是JavaScript最重要的数据类型
// 对象是一个名/值对的集合，或者一个字符串到值的映射
let book = {             // 对象包含在一对大括号中
    topic: "JavaScript", // 属性"topic"的值是"JavaScript"
    edition: 7           // 属性"edition"的值是7
}                        // 对象末尾还有一个大括号

// 使用 . 或 [] 访问对象的属性
book.topic                // => "JavaScript"
book["edition"]           // => 7：另一种访问属性值的方式
book.author = "Flanagan"; // 通过赋值创建新属性
book.contents = {};       // {}是一个没有属性的空对象

// 使用 ?. （ES2020）条件式访问属性
book.contents?.cho1?.sect1 // => undefined：book.contets 没有cho1这个属性

// JavaScript也支持值的数组（数值索引的列表）
let primes = [2, 3, 5, 7]; // 包含4个值的数组，[ 和 ] 是定界符
primes[0]                  // => 2：数组的第一个（索引为0）元素
primes.length              // => 4：数组包含多少个元素
primes[primes.length-1]    // => 7：数组的最后一个元素
primes[4] = 9;             // 通过赋值添加新元素
primes[4] = 11;            //或者通过赋值修改已有元素
let empty = [];            //[]是一个没有元素的空数组
empty.length               // => 0

// 数组和对象可以保存数组和对象
let points = [             // 包含2个元素的数组
    {x: 0, y: 0},          // 每个元素都是一个对象
    {x: 1, y: 1},
];
let data = {                  // 包含2个属性的对象
    trial1: [[1, 2], [3, 4]], // 每个属性的值都是一个数组
    trial2: [[2, 3], [4, 5]]  // 数组的元素也是数组
}
```

> ​																**代码示例中的注释语法**
>
> 你可能注意到了，前面代码中有的注释是以箭头（=>）开头的。这些箭头是在模拟交互式JavaScript环境（例如浏览器控制台），在纸质书上展示注释前面的代码产生的值。
>
> //=>注释也充当一种断言，我曾写过一个工具，专门测试代码并验证它能产生这种注释中指定的值。这应该（我希望）可以减少本书代码的错误。
>
> 有两种相关的注释／断言风格。如果你看到` // a==42 `形式的注释，那意味着在注释前面的代码运行之后，变量a的值将是42。如果你看到 `// !`形式的注释，那意味着注释前面的代码抛出了异常（而注释中！后面的内容通常会解释抛出的是什么异常）。
>
> 这样的注释在本书中随处可见。

这里展示的在中括号内罗列出数组元素以及在大括号中将对象属性名映射为属性值的语法被称为初始化表达式（ initializer expression )，也是第 4 章的一个主题。表达式在 JavaScript 中就是一个短语，可以求值产生一个值。例如，使用 `．`或`[]`引用对象属性的值或数组元素就是表达式。

JavaScript 构造表达式的一个最常见方式是使用操作符：

```js
// 操作符用于操作值（操作数）以产生新值
// 算术操作符是最简单的操作符
3 + 2 // => 5: 加
3 - 2 // => 1: 减
3 * 2 // => 6: 乘
3 / 2 // => 1.5: 除
points[1].x-points[θ].x // => 1: 更复杂的操作数也可以
"3" + "2" // => "32" ：+号用于计算数值加法或拼接字符串

// JavaScript 定义了一些简写的算术操作符
let count = 0; // 定义变量
count++; // 递增变量
count--; // 递减变量
count += 2; // 加2：等价于count = count + 2;
count *= 3; // 乘3：等价于count = count * 3;
count // => 6：变量名也是表达式

// 相等和关系操作符测试两个值是否相等、不等、
// 小于、大于，等等。它们求值为true或fale
let x = 2, y = 3; // 这里的=号用于赋值，不是测试相等
x === y // => false：相等操作符
x !== y // => true：不相等操作符
x < y // => true：小于操作符
x <= y // => true：小于或等于操作符
x > y // => false：大于操作符
x >= y // => false：大于或等于操作符
"two" === "three" // => false：两个字符串不相同
"two" === "three" // => true："tw"按字母表顺序大于"th"
false === (x > y) // => true: false等于false

// 逻辑操作符组合或反转布尔值
(x === 2) &&(y === 3) // => true：两个比较都为true。&&是逻辑与
(x > 3) || (y < 3) // => false：两个比较都不是true。|| 是逻辑或
!(x === y) // => true：!用于反转布尔值
```

如果 JavaScript 表达式像短语；那 JavaScript 语句就像完整的句子。语句是第5章的主题。简单地说，表达式只用于计算值，什么也不做，**即不以任何方式改变程序的状态**。而**语句没有值，但却会改变状态**。前面我们已经看到了变量声明和赋值语句。另外还有一类语句叫控制结构，例如条件和循环。在介绍完函数之后，我们会看到它们的示例。

函数是一个有名字、有参数的 JavaScript 代码块，只要定义一次就可以反复调用。第8章会正式介绍函数，但在之前你也会多次看到它们，就像对象和数组一样。下面是几个简单的示例：

```js
// 函数是可以调用的有参数的JavaScript代码块
function plus1(x) {   // 定义一个名字为"plus1"、参数为"x"的函数
    return x + 1;     // 返回一个比传入值大1的值
}                     //函数体包含在大括号中
plus1(y)              // => 4：y是3，因此这次调用返回3+1

let square = function(x) { // 函数也是值，可以赋给变量
    return x * x;          // 计算函数的值
}
square(plus1(y))           // => 16：在一个表达式中调用两个函数
```

ES6 及之后，有一种定义函数的简写方式。这种简洁的语法使用`=>`来分隔参数列表和函数体，因此以这种方式定义的函数被称为**箭头函数**。箭头函数经常用于把一个未命名函数作为参数传给另一个函数。前面的函数用箭头函数重写后如下所示：

```js
const plus1 = x => x + 1;  // 输入x映射为输出×+1
const square = × => × * x; // 输入x映射为×*x
plus1(y)                   // => 4：函数调用相同
square(plus1(y))           // => 16
```

在通过对象使用函数时，我们称其为方法：

```js
// 在把函数赋值给对象的属性时，我们称它们为“方法”
// 所有JavaScript对象（包括数组）都有方法
let a = [];      // 创建一个空数组
a.push(1, 2, 3); // push()方法为数组添加元素
a.reverse();     //另一个方法reverse（）对元素进行排序

// 我们也可以定义自己的方法。此时的 this 关键字引用的是
// 方法所在的对象，也就是前面定义的数组points
points.dist = function() {
    let p1 = this[0];                   // 调用数组的第一个元素
    let p2 = this[1];                   // this对象的第二个元素
    let a = p2.x - p1.x;                // x坐标的差
    let b = p2.y - p1.y;                // y坐标的差
    return Math.sqrt(a*a + b*b);        // 毕达哥拉斯定理 Math.sqrt(）计算平方根
}
points.dist()   // => Math.sqrt(2)：两个点之间的距离
```

现在，按照约定，我们再介绍几个函数，它们的函数体演示了常用的JavaScript控制结构语句：

```js
// JavaScript语句中有条件和循环，语法与 C、C++、Java 和其他一些语言是一样的
function abs(x) {      // 一个计算绝对值的函数
    if (x >= 0) {      // if语句
        return x;      // 如果比较为true，则执行这行代码
    }                  // 这里是if子句的结束
    else {             // 条件else在比较为false时
        return -x;     // 执行这行代码
    }                  // 大括号在每个子句只有一条语句时是可选的
}                      // 注意返回语句嵌套在了if/else中
abs(-10) === abs(10)   // => true

function sum(array) {          // 计算数组元素之和
    let sum =0; // 首先把表示和的sum初始化为①
    for (let x of array) { // 循环数组，将每个元素赋值给×     
        sum += x; // 把元素的值加到sum上
    } // 循环在这里结束
    return sum; // 返回sum
}
sum(primes) // => 28：sum是前5个素数之和（2+3+5+7+11）

function factorial(n) { // 一个计算阶乘的函数
    let product = 1; // 首先把表示乘积的product初始化为1
    while (n > 1) { // while循环：当（）中的表达式为true 时重复执行{}中的语句
        product *= n; // product=product*n;的简写形式
        n--; // n=n-1；的简写形式
    } // 循环结束
    return product; // 返回product
}
factorial(4) // => 24:1*4*3*2

function factorial2(n) { // 使用不同循环的另一个版本
    let i, product = 1; // 从1开始
    for(i = 2; i <=n; i++) // 从2开始自动递增i直至n
        product *= i; //每次循环都执行。循环体只有一行代码时，可以不要{}
   	return product; // 返回阶乘
}
factorial2(5) // => 120: 1*2*3*4*5
```

JavaScript 支持面向对象的编程风格，但与“经典的”面向对象编程语言非常不一样。第9章将详细介绍JavaScript中的面向对象编程，包含很多示例。下面是一个非常简单的示例，演示了如何定义一个JavaScript类以表示几何平面上的一个点。作为这个类的实例的对象有一个方法，叫作 distance()，用于计算该点与原点的距离：

```js
class Point { // 按惯例，类名需要首字母大写
    constructor(x, y) { // 构造函数用于初始化新实例
        this.x = x; // this关键字代表要初始化的新对象
        this.y = y; // 把函数参数保存为对象属性
    } // 构造函数中不需要return语句
    
    distance() { // 计算从原点到当前点距离的方法
        return Math.sqat(this.x * this.x + this.y * this.y); // 返回x²+y²的平方根
    } // this 引用的是调用这个实例方法的Point对象
}

// 使用Point()构造函数和new创建Point对象
let p = new Point(1，1); // 几何平面上的点（1,1)
// 调用Point对象p的方法
p.distance()  // => Math.SQRT2
```

对 JavaScript 基础语法和能力的介绍之旅到此就要结束了。但本书后续还有很多章，分别自成一体地介绍了这门语言的其他特性。

**第 10 章 模块**

展示文件或脚本中的 JavaScript 代码如何使用其他文件和脚本中定义的 JavaScript 函数和类。

**第 11 章 JavaScript 标准库**

展示所有 JavaScript 程序都可以使用的内置函数和类，包括像映射、集合这样重要的数据结构，还有用于文本模式匹配的正则表达式类，以及序列化 JavaScript 数据结构的函数，等等。

**第 12 章 迭代器与生成器**

解释 for/of 循环的原理，以及如何定义可以在 for/of 中使用的类。该章还介绍生成器函数及 yield 语句。

**第 13 章 异步 JavaScript**

该章深入探讨 JavaScript 的异步编程，涵盖回调与事件、基于期约的 API，以及 async 和 await 关键字。虽然核心JavaScript 语言并非异步的，但浏览器和 Node 中的 API 默认都是异步的。该章解释使用这些API的技术。

**第 14 章 元编程**

介绍一些高级 JavaScript 特性，为其他 JavaScript 程序员编写代码库的读者可能会感兴趣。

**第 15 章 浏览器中的 JavaScript**

介绍浏览器宿主环境，解释浏览器如何执行 JavaScript 代码，涵盖浏览器定义的大多数重要 API。该章是迄今为止这本书中最长的一章。

**第 16 章 Node 服务器端 JavaScript**

介绍 Node 宿主环境，涵盖基础编程模型、数据结构和需要理解的最重要的API。

**第 17 章 JavaScript 工具和扩展**

涵盖广泛应用并有效提升开发者效率的工具及语言扩展。

## 4 示例：字符频率柱形图

本章最后展示一个虽短但并不简单的 JavaScript 程序。示例1-1是一个 Node 程序，它从标准输人读取文本，计算该文本的字符频率柱形图，然后打印出来。可以像下面这样调用这个程序，分析它自己源代码的字符频率：

![image-20240508223253494](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/blog/image-20240508223253494.png)

这个示例使用了一些高级 JavaScript 特性，有意让大家看看真正的 JavaScript 程序长什么样。不过，即使你不理解这些代码也没关系，其中用到的特性本书后续章节都会介绍。

示例1-1：使用JavaScript计算字符频率柱形图

```js
/**
 * 这个Node程序从标准输入中读取文本，计算文本中每个
 * 字母出现的频率，然后按使用频率降序显示一个柱形图
 * 运行这个程序需要Node12或更高版本
 * 
 * 在一个Unix类型的环境中，可以像下面这样调用它：
 * node charfreq.js < corpus.txt
 */

// 这个类扩展了Map，以便get()方法在key
// 不在映射中时返回指定的值，而不是null
class DefaultMap extends Map {
    constructor(defaultValue) {
        super(); // 调用超类构造器
        this.defaultValue = defaultValue; // 记住默认值
    }

    get(key) {
        if (this.has(key)) { // 如果映射中有key
            return super.get(key); // 从超类返回它的值
        }
        else {
            return this.defaultValue; // 否则返回默认值
        }
    }
}

// 这个类计算并显示字母的频率柱形图
class Histogram {
    constructor() {
        this.letterCounts = new DefaultMap(0); // 字母到数量的映射
        this.totalLetters = 0; // 字母总数
    }

    // 这个函数用文本中的字母更新柱形图
    add(text) {
        // 移除文本中的空白，然后将字母转换为大写
        text = text.replace(/\s/g, "").toUpperCase();
        // 接着循环文本中的字符
        for (let character of text) {
            let count = this.letterCounts.get(character); // 取得之前的数量
            this.letterCounts.set(character, count + 1); // 递增
            this.totalLetters++;
        }
    }

    // 将柱形图转换为字符串并显示 ASCII 图形
    toString() {
        // 把映射转换为一个 [key, value] 数组的数组
        let entries = [...this.letterCounts];

        // 按数量和字母表对数组排序
        entries.sort((a, b) => { // 这个函数定义排序的方式
            if (a[1] === b[1]) { // 如果数量相同，按字母表排序；如果数量不同，数量大的排前面
                return a[0] < b[0] ? -1 : 1;
            } else {
                return b[1] - a[1];
            }
        });

        // 把数量转换为百分比
        for (let entry of entries) {
            entry[1] = entry[1] / this.totalLetters * 100;
        }

        // 删除小于1%的条目
        entries = entries.filter(entry => entry[1] >= 1);

        // 接着把每个条目转换为一行文本
        let lines = entries.map(([l, n]) => `${l}: ${"#".repeat(Math.round(n))} ${n.toFixed(2)}%`);

        // 返回把所有行拼接起来的结果，以换行符分隔
        return lines.join("\n");
    }
}

// 这个async （返回期约的）函数创建一个Histogram对象
// 从标准输入异步读取文本块，然后把这些块添加到柱形图
// 在读取到流末尾后，返回柱形图
async function histogramFromStdin() {
    process.stdin.setEncoding("utf-8"); // 读取Unicode字符串，而非字节
    let histogram = new Histogram();
    for await (let chunk of process.stdin) {
        histogram.add(chunk);
    }
    return histogram;
}
// 最后这行代码是这个程序的主体
// 它基于标准输入创建一个Histogram对象，然后打印柱形图
histogramFromStdin().then(histogram => { console.log(histogram.toString()); });

```

## 5 小结

本书以自底向上的方式解释 JavaScript。这意味着要先从较低层次的注释、标识符、变量和类型讲起，然后在此基础上介绍表达式、语句、对象和函数。接着介绍更高层次的语言抽象，例如类和模块。本书的书名包含“权威”二字是认真的，接下来的章节对这门语言的解释可能详细得令人反感。然而，想要真正掌握 JavaScript 必须理解这些细节，希望你能花时间从头到尾读完这本书。不过，不要一上来就想着这样做。假如某一节内容你怎么也看不懂，可以先跳过去。等你对这门语言有了一个整体的了解时，可以再回来了解那些细节。