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