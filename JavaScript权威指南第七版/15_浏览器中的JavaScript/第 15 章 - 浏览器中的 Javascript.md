# 第 15 章 - 浏览器中的 JavaScript

## 15.4 操作 CSS

我们已经知道了 JavaScript 可以控制 HTML 文档的逻辑结构和内容。通过对 CSS 编程，JavaScript 也可以控制文档的外观和布局。接下来几节讲解几种 JavaScript 可以用来操作 CSS 的不同技术。

本书是讲 JavaScript 而不是讲 CSS 的，因此本节假设读者已经了解如何使用 CSS 为 HTML 内容添加样式。不过，这里还是有必要提几个 JavaScript 中常用的CSS 样式：

* 把 display 样式设置为 “none” 可以隐藏元素。随后再把 display 设置为其他值可以再显示元素。
* 把 position 样式设置为 “absolute”、 “relative” 或 “fixed” ，然后再把 top 和 left 样式设置为相应的坐标，可以动态改变元素的位置。这个技术对于使用 JavaScript 显示模态对话框或工具提示条等动态内容很重要。
* 通过 transform 样式可以移动、缩放和旋转元素。
* 通过 transition 样式可以动态改变其他 CSS 样式。这些动画由浏览器自动处理，不需要 JavaScript，但可以使用 JavaScript 启动动画。

### 15.4.1 CSS 类

使用 JavaScript 影响文档内容样式的最简单方式是给 HTML 标签的 class 属性添加或删除 CSS 类名。15.3.3节在 “class属性” 中介绍过，Element 对象的classList 属性可以用来方便地实现此类操作。

比如，假设文档的样式表包含一个 “hidden” 类的定义：

```css
.hidden {
    display: none;
}
```

基于这个定义，可以通过如下代码隐藏（和显示）元素：

```js
// 假设 “tooltip” 元素在 HTML中有 class="hidden"
// 可以像这样让它变得可见：
document.querySelector("#tooltip").classList.remove("hidden");

// 可以像这样让它再隐藏起来：
document.querySelector("#tooltip").classList.add("hidden");
```

### 15.4.2 行内样式

继续前面工具提示条（tooltip）的例子，假设文档的结构中只包含一个提示条元素，而我们想在显示它之前先动态把它定位好。一般来说，我们不可能针对提示条的所有可能位置都创建一个类，因此 classList 属性不能用于定位。

这种情况下，我们需要用程序修改提示条在 HTML中 的 style 属性，设置只针对它自己的行内样式。DOM 在所有 Element 对象上都定义了对应的 style 属性。但与大多数镜像属性不同，这个 style 属性不是字符串，而是 CSSStyleDeclaration 对象，是对 HTML 中作为 style 属性值的 CSS 样式文本解析之后得到的一个表示。要在 JavaScript 中显示和设置提示条的位置，可以使用类似下面的代码：

```js
function displayAt(tooltip, x, y) {
    tooltip.style.display = "block";
    tooltip.style.position = "absolute";
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}
```

> **命名约定：JavaScript 中的 CSS 属性**
>
> 很多 CSS 样式属性（比如 font-size）的名字中都包含连字符。连字符在 JavaScript 中被会解释为减号，因此不允许出现在属性名其他标识符中。为此，CSSStyleDeclaration 对象的属性名与实际的 CSS 属性名稍微有点不一样。如果 CSS 属性名包含一个或多个连字符，对应的 CSSStyleDeclaration 属性名将剔除连字符，并将每个连字符后面的字母变成大写。例如，JavaScript 会使用 borderLeftWidth 属性访问 border-left-width 这个 CSS 属性，而 CSS 的 font-family 属性在 JavaScript 中也会被写成 fontFamily。

在使用 CSSStyleDeclaration 的样式属性时，要记住所有值都必须是字符串。在样式表或 style 属性里，可以这样写：

```css
display: block; font-family: sans-serif; backgrount-color: #ffffff;
```

但在 JavaScript 要对元素 e 设置相同的样式，必须给所有值都加上引号：

```js
e.style.display = "block";
e.style.fontFamily = "sans-serif";
e.style.backgroundColor = "#ffffff";
```

注意分号不包含在字符串中，它们只是普通的 JavaScript 分号。我们在 CSS 样式表中使用的分号在通过 JavaScript 设置字符串值时并不是必需的。

还有，要记住很多CSS属性要求包含单位，如 “px” 表示像素，“pt” 表示点。因此，像下面这样设置 marginLeft 属性是不正确的：

```js
e.sytle.marginLeft = 300;   // 不正确：这是一个数值，不是字符串
e.sytle.marginLeft = "300"; // 不正确：没有包含单位
```

在 JavaScript 中设置样式属性时单位是必需的，就跟在样式表中设置样式属性一样。把元素 e 的 marginLeft 属性设置为 300 像素的正确方式是：

```js
e.sytle.marginLeft = "300px"; 
```

如果想把某个 CSS 属性设置为计算值，也要确保在计算表达式末尾加上单位：

```js
e.style.left = `${x0 + left_border + left_padding}px`;
```

我们知道，有些 CSS 属性是其他属性的简写形式，比如 margin 是 margin-top、margin-right、margin-bottom 和 margin-left 的简写。CSSStyleDeclaration 对象上也有与这些简写属性对应的属性。例如，可以像这样设置 margin 属性：

```js
e.style.margin = `${top}px ${right}px ${bottom}px ${left}px`;
```

有时候，以字符串而非 CSSStyleDeclaration 对象形式设置和读取行内样式会更方便。为此，可以使用 Element 的 getAttribute() 和 setAttribute() 方法，或者也可以使用 CSSStyleDeclaration 对象的 cssText 属性：

```js
// 把元素e的行内样式复制给元素f
f.setAttribute("style", e.getAttribute("style"));

// 或者，这样也可以
f.style.cssText = e.style.cssText;
```

在读取元素的 style 属性时，应该知道它只表示元素的行内样式，而多数元素的多数样式都是在样式表中指定的，不是写在行内的。并且，通过 style 属性读到的任何单位和简写属性，都是对应 HTML 属性中实际使用的格式，你的代码可能必须进行复杂解析才能解释它们。一般来说，如果你想知道一个元素的样式，那需要的可能是计算样式，也就是下一节要讨论的。

### 15.4.3 计算样式

元素的计算样式（computed style）是浏览器根据一个元素的行内样式和所有样式表中适用的样式规则导出（或计算得到）的一组属性值，浏览器实际上使用这组属性值来显示该元素。与行内样式类似，计算样式同样以 CSSStyleDeclaration 对象表示。但与行内样式不同的是，计算样式是只读的，不能修改计算样式，但表示一个元素计算样式的 CSSStyleDeclaration 对象可以让你知道浏览器在渲染该元素时，使用了哪些属性和值。

使用 Window 对象的 getComputedStyle() 方法可以获取一个元素的计算样式。这个方法的第一个参数是要查询的元素，可选的第二个参数用于指定一个CSS伪元素(如`::before`或`::after`)：

```js
let title = document.querySelector("#section1title");
let styles = window.getComputedStyle(title);
let beforeStyles = window.getComputedStyle(title, "::before");
```

getComputedStyle() 的返回值是一个 CSSStyleDeclaration 对象，该对象包含应用给指定元素（或伪元素）的所有样式。这个 CSSStyleDeclaration 对象与表示行内样式的 CSSStyleDeclaration 对象有一些重要的区别：

* 计算样式的属性是只读的。
* 计算样式的属性是绝对值，百分比和点等相对单位都被转换成了绝对值。任何指定大小的属性（如外边距大小和字体大小）都将以像素度量。相应的值会包含“px”后缀，虽然还需要解析，但不用考虑解析或转换其他单位。值为颜色的属性将以“rgb()”或“rgb()”格式返回。
* 简写属性不会被计算，只有它们代表的基础属性会被计算。例如，不能查询margin属性，而要查询marginLeft、marginTop等。类似地，不要查询border甚至borderWidth，而要查询borderLeftWidth、borderTopWidth。
* 计算样式的cssText属性是undefined。

getComputedStyle() 返回的 CSSStyleDeclaration 对象中包含的属性，通常要比行内 style 属性对应的 CSSStyleDeclaration 对象多很多。但计算样式比较难说，查询它们并一定总能得到想要的信息。以 font-family 属性为例，它接收逗号分隔的字体族的列表，以实现跨平台兼容。在查询计算样式的 fontFamily 属性时，只是得到应用给元素的最特定于 font-family 样式的值，这可能会返回类似 “arial,helvetica,sans-serif” 这样的值，并不说明实际使用了哪种字体。再比如，如果某元素没有被绝对定义，通过计算样式查询其 top 和 left 属性经常会返回 auto。这是个合法的 CSS 值，但却不一定是你想找的。

尽管CSS可以精确指定文档元素的位置和大小，查询元素的计算样式并非确定该元素大小和位置的理想方式。15.5.2节介绍了一个更简单易用的替代方案。

### 15.4.4 操作样式表

除了操作 class 属性和行内样式，JavaScript也可以操作样式表。样式表是通过`<sytle>`标签或`<link rel="stylesheet">`标签与 HTML 文档关联起来的。这两个标签都是普通的HTML标签，因此可以为它们指定一个id属性，然后使用`document.querySelector()`找到它们。

`<style>`和`<link>`标签对应的 Element 对象都有 disabled 属性，可以用它禁用整个样式表。比如，可以像下面这样使用这个属性：

```js
// 这个函数可以实现“light”和“dark”主题的切换
function toggleTheme() {
    let lightTheme = document.querySelector("#light-theme");
    let darkTheme = document.querySelector("#dark-theme");
    if (darkTheme.disabled) {
        lightTheme.disabled = true;
        darkTheme.disabled = false;
    } else {
        lightTheme.disabled = false;
        darkTheme.disabled = true;
    }
}
```

另一个操作样式表的简单方式是使用前面介绍的 DOM API 向文档中插入新样式表。例如：

```js
 function setTheme(name) {
    // 创建新<link ref="stylesheet">元素，用以加载指定name的样式表
    let link = document.createElement("link");
    link.id = "theme";
    link.rel = "stylesheet";
    link.href = `themes/${name}.css`;
    
    // 通过id="theme"查找当前的<link>元素
    let currentTheme = document.querySelector("#theme");
    if (currentTheme) {
        // 如果找到了，则将当前主题替换为新主题
        currentTheme.replaceWith(link);
    } else {
        // 否则，直接插入包含主题的<link>元素
        document.head.append(link);
    }
}
```

虽然算不上巧妙，但也可以向文档中插入一段包含`<style>`标签的HTML字符串。这是一种好玩的技术，例如：

```js
document.head.insertAdjacentHTML(
    "beforeend"
    "<style>body{transform:rotate(180deg)}</style>"
)
```

浏览器定义了一套 API，以便 JavaScript 能够在样式表中查询、修改、插入或删除样式规则。这套 API 太专业了，我们没办法在这里讲解。大家可以在 MDN 上自行搜索 “CSSObjectModel” 或 “CSSStyleSheet” 并阅读。

### 15.4.5 CSS 动画与事件

假设你的样式表中定义了下面两个 CSS 类：

```css
.transparent { opacity: 0; }
.fadeable { transition: opacity .5s ease-in }
```

如果把第一个样式应用给某个元素，该元素会变成完全透明，不可见。而第二个样式中的过渡属性（transition）会告诉浏览器当元素的不透明度（opacity）变化时，该变化应该在0.5秒的时间内以动画的形式呈现。其中的ease-in要求不透明度的变化动画应该先慢后快。

现在假设 HTML 文档中包含一个有 “fadeable” 类的元素：

```html
<div id="subscribe" class="fadeable notification">
    ...
</div>
```

在JavaScript中，可以为它添加 “transparent” 类：

```js
document.querySelector("#subscribe").classList.add("transparent");
```

这个元素是为不透明度动画而配置的。给它添加 “transparent” 类，改变不透明度，会触发一次动画：浏览器会在半秒内让元素“淡出”为完全透明。

相反的过程也能触发动画：如果删除“fadable”元素的“transparent”类，又会改变不透明度，因此元素将淡入，变得再次可见。

这个过程不需要 JavaScript 做任何事情，是纯粹的 CSS 动画效果。但 JavaScript 可以用来触发这种动画。

JavaScript 也可以用来监控 CSS 过渡动画的进度，因为浏览器在过渡动画的开始和结束都会触发事件。首次触发过渡时，浏览器会派发 “transitionrun” 事件。这时候可能刚刚指定 transition-delay 样式，而视觉上还没有任何变化。当发生视觉变化时，又会派发 “transitionstart” 事件，而当动画完成时，则会派发 “transitionend” 事件。当然，所有这些事件的目标都是发生动画的元素。这些事件传给处理程序的事件对象是一个 TransitionEvent 对象。该对象的propertyName 属性是发生动画的 CSS 属性，而 “ transitionend” 事件对应的事件对象的 elapsedTime 属性是从 “transitionstart” 事件开始经过的秒数。

除了过渡之外，CSS 也支持更复杂的动画形式，可以称其为 “CSS动画” 。这会用到 animation-name、animation-duration 和特殊的 @keyframes 规则来定义动画细节。讲解 CSS 动画的原理超出了本书范畴，但如果你是在一个 CSS 类上定义了所有这些动画属性，那只要使用 JavaScript 把这个类添加到要做成动画的元素上就可以触发动画。

与 CSS 过渡类似，CSS 动画也触发事件，可以供 JavaScript 代码监听。动画开始时触发 “animationstart” 事件，完成时触发 “animationend” 事件。如果动画会重复播放，则每次重复（不包括最后一次）都会触发 “animationiteration” 事件。事件目标是发生动画的元素，而传给处理程序的事件对象是AnimationEvent 对象。这个对象的 animationName 属性是定义动画的 animation-name 属性，而 elapsedTime 属性反映了自动画开始以后经过了多少秒。

## 15.5 文档几何与滚动

本章到现在，我们一直把文档想象成元素和文本节点的抽象树。但当浏览器在窗口中渲染文档时，它会创建文档的一个视觉表示，其中每个元素都有自己的位置和大小。有时候，Web应用可以把文档看成元素的树，不考虑这些元素在屏幕上如何展示。但有时候，又必须知道某个元素精确的几何位置。例如，要使用CSS动态把一个元素（如提示条）定位到某个常规定位的元素旁边，必须先知道这个常规定位元素的位置。

接下来几节将介绍如何在基于树的抽象文档模型和基于几何坐标系的文档视图之间切换。

### 15.5.1 文档坐标与视口坐标

文档元素的位置以 CSS 像素度量，其中x坐标向右表示增大，y坐标向下表示增大。

可以有两个点作为原点：文档的左上角、显示文档的视口（viewport）的左上角。

视口：在顶级窗口和标签页中，就是浏览器窗口中实际显示文档内容的区域。对于显示在`<iframe>`标签中的文档，就是 DOM 中的内嵌窗格`<iframe>`元素。

如果文档比视口小，或者如果文档没有被滚动过，则文档左上角就位于视口左上角，文档和视口坐标系是相同的。

CSS 的 overflow 属性允许文档中的元素包含比它能显示的更多的内容。元素可以有自己的滚动条，并作为它们所包含内容的视口。

Web 允许在滚动文档中存在滚动元素，意味着不可能只使用一个 (x,y) 点描述元素在文档中的位置。

客户端 JavaScript 更多地会使用视口坐标。`getBoundingClientRect()` 和`elementFromPoint()`方法使用的就是视口坐标，而
鼠标和指针事件对象的`clientX`和`clientY`属性使用的也是这个坐标。

CSS 的position 的不同取值如下：

* `position: fixed`：`top`和`left`属性相对于视口坐标来解释。
* `position: relative`：元素会相对于没给它设置 position 属性时的位置进行定位。
* `position: absolute`：`top`和`left`相对于文档或最近的包含定位元素。

一个相对定位元素中包含一个绝对定位元素，则绝对定位元素会相对于这个相对定位的包含元素而不是整个文档定位。实践中，经常会把元素设置为相对定位，同时将其top和left设置为0（这样作为容器它的布局没有变化），从而为它包含的绝对定位元素建立一个新的坐标系统。可以把这个新的坐标系统称为“容
器坐标”，以便区分于文档坐标和视口坐标。

