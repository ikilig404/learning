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

### 15.5.2 查询元素的几何大小

`getBoundingClientRect()`方法没有参数，返回一个对象，对象包含`left`、`right`、`top`、`bottom`、`width`和`height`属性。

块级元素（如图片、段落和`<div>`元素）在浏览器的布局中始终是矩形。行内元素（如`<span>`、`<code>`和`<b>`元素）则可能跨行，因而包含多个矩形。比如，`<em>`和`</em>`标签间的文本显示在了两行上，则它的矩形会包含第一行末尾和第二行开头。如果在这个元素上调用`getBoundingClientRect()`，则边界矩形将包含两行的整个宽度。如果想查询行内元素中的个别矩形，可以调用`getClientRects()`方法，得到一个只读的类数组对象，其元素为类似`getBoundingClientRect()`返回的矩形对象。

### 15.5.3 确定位于某一点的元素

使用`getBoundingClientRect()`方法可以确定视口中某个元素的当前位置。有时候，我们想从另一个方向出发，确定在视口中某个给定位置上的是哪个元素。为此可以使用`Document`对象的`elementFromPoint()`方法。调用这个方法并传入一个点的`x`和`y`坐标(视口坐标，而非文档坐标。比如，可以使用鼠标事件中的`clientX`和`clientY`坐标）。`elementFromPoint()`返回一个位于指定位置的`Element`对象。选择元素的碰撞检测（hit detection）算法并没有明确规定，但这个方法的意图是返回相应位置上最内部（嵌套最深）、最外层（最大的CSS `z-index`属性）的元素。

### 15.5.4 滚动

`Window`对象的`scrollTo()`方法接收一个点的`x`和`y`坐标（文档坐标），并据以设置滚动条的位移。换句话说，这个方法会滚动窗口，从而让指定的点位于视口的左上角。如果这个点太接近文档底部或右边，浏览器会尽可能让视口左上角接近这个点，但不可能真的移动到该点。以下代码会滚动浏览器让文档最底部的页面显示出来：

```js
// 取得文档和视口的高度
let documentHeight = document.documentElement.offsetHeight;
let viewportHeight = window.innerHeight;
// 滚动到最后一“页”在视口中可见
window.scrollTo(0, documentHeight - viewportHeight);
```

`Window`对象的`scrollBy()`方法与`scrollTo()`类似，但它的参数是个相对值，会加在当前滚动位置之上：

```js
// 每500毫秒向下滚动50像素。注意，没有办法停止！
setInterval(() => { scrollBy(0, 50) }, 500);
```

如果想让`scrollTo()`和`scrollBy()`平滑滚动，需要传入一个对象，而不是两个数值，比如：

```js
window.scrollTo({
    left: 0,
    top: documentHeight - viewportHeight,
    behavior: "smooth"
});
```

有时候，我们不是想让文档滚动既定的像素距离，而是想滚动到某个元素在视口中可见。此时可以在相应 HTML 元素上调用`scrollIntoView()`方法。这个方法保证在上面调用它的那个元素在视口中可见。默认情况下，滚动后的结果会尽量让元素的上边对齐或接近视口上沿。如果给这个方法传入唯一的参数`false`，则滚动后的结果会尽量让元素的底边对齐视口下沿。为了让元素可见，浏览器也会水平滚动视口。

同样可以给`scrollIntoView()`传入一个对象，设置`behavior："smooth"`属性，以实现平滑滚动。而设置`block`属性可以指定元素在垂直方向上如何定位，设置`inline`属性可以指定元素在水平方向上如何定位（假设需要水平滚动）。这两个属性的有效值均包括`start`、`end`、`nearest`和`center`。

### 15.5.5 视口大小、内容大小和滚动位置

前面说过，浏览器窗口和一些 HTML 元素可以显示滚动的内容。在这种情况下，我们有时候需要知道视口大小、内容大小和视口中内容的滚动位移。本节介绍这些细节。

对浏览器窗口而言，视口大小可以通过`window.innerWidth`和`window.innerHeight`属性获得（针对移动设备优化的网页通常会在`<head>`中使用`<meta name="viewport">`标签为页面设置想要的视口宽度）。文档的整体大小与`<html>`元素，即`document.documentElement`的大小相同。要获得文档的宽度和高度，可以使用`document.documentElement`的`getBoundingClientRect()`方法，也可以使用`document.documentElement`的`offsetWidth`和`offsetHeight`属性。文档在视口中的滚动位移可以通过`window.scrollX`和`window.scrollY`获得。这两个属性都是只读的，因此不能通过设置它们的值来滚动文档。滚动文档应该使用`window.scrollTo()`。

对元素来说，问题稍微复杂一点。每个`Element`对象都定义了下列三组属性：

```js
offsetWidth     clientWidth    scrollWidth
offsetHeight    clientHeight   scrollHeight
offsetLeft      clientLeft     scrollLeft
offsetTop       clientTop      scrollTop
offsetParent
```

元素的`offsetWidth`和`offsetHeight`属性返回它们在屏幕上的 CSS 像素大小。这个大小包含元素边框和内边距，但不包含外边距。元素的`offsetLeft`和`offsetTop`属性返回元素的`x`和`y`坐标。对很多元素来说，这两个值都是文档坐标。但对定位元素的后代或者另一些元素（如表格单元）来说，这两个值是相对于祖先元素而非文档的坐标。而`offsetParent`属性保存着前述坐标值相对于哪个元素。这一组属性都是只读的。

元素的`clientWidth`和`clientHeight`属性与`offsetWidth`和`offsetHeight`属性类似，只是它们不包含元素边框，只包含内容区及内边距。`clientLeft`和`clientTop`属性没有多大用处，它们是元素内边距外沿到边框外沿的水平和垂直距离。一般来说，这两个值就等于左边框和上边框的宽度。这一组属性都是只读的。对于行内元素（如`<i>`、`<code>`和`<span>`)，这些属性的值全为0。

元素的`scrollWidth`和`scrollHeight`属性是元素内容区大小加上元素内边距，再加上溢出内容的大小。在内容适合内容区而没有溢出时，这两个属性等同于`clientWidth`和`clientHeight`。但在有溢出时，这两个属性还包含溢出内容，因此它们的值大于`clientWidth`和`clientHeight`。`scrollLeft`和`scrollTop`是元素内容在元素视口中的滚动位移。与本节介绍的其他属性不同，`scrollLeft`和`scrollTop`是可写属性，因此可以通过设置它们的值滚动元素中的内容（在多数浏览器中，`Element`对象也跟`Window`对象一样有`scrollTo()`和`scrollBy()`方法，但并非所有浏览器都支持）。

## 15.6 Web组件

HTML 是一种文档标记语言，为此也定义了丰富的标签。过去30年，HTML 已经变成 Web 应用描述用户界面的语言，但`<input>`和`<button>`等简单的 HTML 标签并不能满足现代 UI 设计的需要。Web 开发者可以凑合着使用它们，但必须以 CSS 和 JavaScript 来增强这些 HTML 标签的外观和行为。下面来看一个典型的用户界面组件，如图 15-3 所示。

![image-20240826215243320](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/blog/image-20240826215243320.png)

使用HTML的`<input>`元素可以从用户接收一行输入，但它本身没有任何途径来显示图标，比如在左侧显示放大镜，在右侧显示取消X。为了在网页中实现类似这样的现代用户界面元素，至少需要使用4个 HTML 标签：一个`<input>`标签用于接收和显示用户的输入、两个`<img>`标签（或者两个`<span>`标签显示 Unicode 图形）和一个作为容器的`<div>`元素包含前面3个子元素。另外，必须使用 CSS 隐藏`<input>`元素的默认边框，并为容器定义一个边框。还需要使用 JavaScript 让所有这些 HTML 元素协同工作。比如当用户单击X图标时，需要一个事件处理程序清除`<input>`元素中的用户输入。

这是个不小的工作量，但每次要在 Web 应用中显示搜索框时都要这么做。今天的多数 Web 应用都不是用“原始的” HTML 写的。相反，很多 Web 开发者使用 React、Angular 等框架，这些框架支持创建类似这个搜索框的可重用的用户界面组件。Web组件是浏览器原生支持的替代这些框架的特性，主要涉及相对比较新的三个 Web 标准。这些 Web 标准允许 JavaScript 使用新标签扩展 HTML，扩展后的标签就是自成一体的、可重用的 UI 组件。

接下来几小节将展示如何在你自己的网页中使用其他开发者定义的 Web 组件，然后解释构成 Web 组件的这三个技术，最后通过一个示例将这三个技术整合在一起，实现图15-3所展示的搜索框组件。

### 15.6.1 使用 Web 组件

Web 组件是在 JavaScript 中定义的，因此要在 HTML 中使用 Web 组件，需要包含定义该组件的 JavaScript 文件。Web 组件是相对比较新的技术，经常以 JavaScript 模块形式写成，因此需要在 HTML 中像下面这样包含 Web 组件：

```html
<script type="module" src="components/search-box.js">
```

Web 组件要定义自己的 HTML 标签名，但有一个重要的限制就是标签名必须包含一个连字符（这意味着未来的HTML 版本可以增加没有连字符的新标签，而这些标签不会跟任何人的 Web 组件冲突）。要使用 Web 组件，只要像下面这样在HTML文件中使用其标签即可：

```html
<search-box placeholder="Search..."></search-box>
```

Web 组件可以像常规 HTML 标签一样具有属性。你使用组件的文档应该告诉你它支持哪些属性。Web 组件不能使用自关闭标签定义，比如不能写成`<search-box />`。你的 HTML 文件必须既包含开标签也包含闭标签。

与常规 HTML 元素类似，有的 Web 组件需要子组件，而有的 Web 组件不需要（也不显示）子组件。还有的 Web 组件可选地接收有标识的子组件，这些子组件会出现在命名的“插槽”（slot）中。在图15-3展示并在示例15-3中实现的`<search-box>`组件，就使用“插槽”传递要显示的两个图标。如果想在`<search-box>`中使用不同的图标，可以这样使用 HTML：

```html
<search-box>
    <img src="images/search-icon.png" slot="left"/>
    <img src="images/cancel-icon.png" slot="right"/>
</search-box>
```

这个 slot 属性是对 HTML 的一个扩展，用于指定把哪个子元素放到哪里。而插槽的名字“left”和“right”是由这个 Web 组件定义的。如果你使用的组件支持插槽，其文档中应该说明。

前面提到过 Web 组件经常以 JavaScript 模块来实现，因此可以通过`<script type="module">`标签引入 HTML 文件中。可能你还记得，本章开头介绍过模块就像添加了`defer`属性一样，会在文档内容解析之后加载。这意味着浏览器通常会在运行包含`<search-box>`定义的代码之前，就要解析和渲染`<search-box>`标签。这在使用Web 组件时是正常的。浏览器中的 HTML 解析器很灵活，对自己不理解的输入非常宽容。当在 Web 组件还没有定义就遇到其标签时，浏览器会向 DOM 树中添加一个通用的 HTMLElement，即便它们不知道要对它做什么。之后，当自定义元素有定义之后，这个通用元素会被“升级”，从而具备预期的外观和行为。

如果 Web 组件包含子元素，那么在组件有定义之前它们可能会被不适当地显示出来。可以使用下面的 CSS 将 Web 组件隐藏到它们有定义为止：

```css
/*
 * 让<search-box>组件在有定义前不可见
 * 同时尝试复现其最终布局和大小，以便近旁
 * 内容在它有定义时不会移动
 */
search-box:not(:defined) {
    opacity: 0;
    display: inline-block;
    width: 300px;
    height: 50px;
}
```

与常规 HTML 元素一样，Web 组件可以在 JavaScript 中使用。如果在网页中包含`<search-box>`标签，就可以通过`querySelector()`和适当的 CSS 选择符获得对它的引用，就像对任何其他 HTML 标签一样。一般来说，只有在定义这个组件的模块运行之后这样做才有意义。因此在查询 Web 组件时要注意不要过早地做这件事。Web 组件实现通常都会（但并非必须）为它们支持的每个 HTML 属性都定义一个 JavaScript 属性。另外，与 HTML 元素相似，它们也可能定义有用的方法。同样，你所使用 Web 组件的文档应该指出可以在 JavaScript 中使用什么属性和方法。

知道了如何使用 Web 组件，接下来三节将介绍用于实现 Web 组件的三个浏览器特性。

> **DocumentFragment节点**
>
> 在介绍 Web 组件 API 之前，需要简单回顾一下 DOM API，解释一下 DocumentFragment是什么。DOM API 将文档组织成一个 Node 对象树，其中 Node 可以是 Document、Element、Text 节点，或者 Comment 节点。但这些节点类型都不能用来表示一个文档片段，或者一组没有父节点的同辈节点。这时候就要用到 DocumentFragment 了。
>
> DocumentFragment 也是一种 Node 类型，可以临时充当一组同辈节点的父节点，方便将这些同辈节点作为一个单元来使用。可以使用 `document.createDocumentFragment()`来创建 DocumentFragment 节点。创建 DocumentFragment 节点后，就可以像使用 Element 一样，通过`append()`为它添加内容。`DocumentFragment`与`Element`的区别在于它没有父节点。但更重要的是，当你向文档中插入`DocumentFragment`节点时，DocumentFragment本身并不会被插入，实际上插入的是它的子节点。

### 15.6.2 HTML 模板

HTML 的`<template>`标签跟 Web 组件的关系虽然没那么密切，但通过它确实可以对网页中频繁使用的组件进行优化。`<template>`标签及其子元素永远不会被浏览器渲染，只能在使用 JavaScript 的网页中使用。这个标签背后的思想是，当网页包含多个重复的基本 HTML 结构时（比如表格行或 Web 组件的内部实现），就可以使用`<template>`定义一次该结构，然后通过JavaScript按照需要任意重复使用该结构。

在JavaScript中，`<template>`标签对应的是一个`HTMLTemplateElement`对象。这个对象只定义了一个`content`属性，而这个属性的值是包含`<template>`所有子节点的`DocumentFragment`。可以克隆这个`DocumentFragment`，然后把克隆的副本插入文档中需要的地方。这个片段自身不会被插入，只有其子节点会。假设你的文档中包含一个`<table>`和`<template id="row">`标签，而后者作为模板定义了表格中行的结构，那可以像下面这样使用模板：

```js
let tableBody = document.querySelector("tbody");
let template = document.querySelector("#row");
let clone = template.content.cloneNode(true);  // 深度克隆
// ......先使用 DOM 把内容插入克隆的<td>元素......
// 然后把克隆且已初始化的表格行插入表格体
tableBody.append(clone);
```

这个模板元素并非只有出现在 HTML 文档中才可以使用。也可以在 JavaScript 代码中创建一个模板，通过innerHTML 创建其子节点，然后再按照需要克隆任意多个副本。这样还不必每次都解析 innerHTML。而且这也是 Web 组件中使用 HTML 模板的方式，示例15-3演示了这个技术。

### 15.6.3 自定义元素

实现 Web 的第二个浏览器特性是“自定义元素”，即可以把一个 HTML 标签与一个 JavaScript 类关联起来，然后文档中出现的这个标签就会在DOM树中转换为相应类的实例。创建自定义元素需要使用`customElements.define()`方法，这个方法以一个 Web 组件的标签名作为第一个参数（记住这个标签名必须包含一个连字符），以一个`HTMLElement`的子类作为其第二个参数。文档中具有该标签名的任何元素都会被“升级”为这个类的一个新实例。如果浏览器将来再解析 HTML，都会自动为遇到的这个标签创建一个这个类的实例。

传给`customELements.define()`的类应该扩展`HTMLElement`，且不是一个更具体的类型（如`HTMLButtonElement`）。第9章曾介绍过，当一个 JavaScript 类扩展另一个类时，构造函数必须先调用`super()`然后才能使用`this`关键字。因此如果自定义元素类有构造器，应该先调用`super()`（没有参数），然后再干别的。

浏览器会自动调用自定义元素类的特定“生命期方法”。当自定义元素被插入文档时，会调用`connectedCallback()`方法。很多自定义元素通过这个方法来执行初始化。还有一个`disconnectedCallback()`方法，会在（如果）自定义元素从文档中被移除时调用，但用得不多。

如果自定义元素类定义了静态的`observedAttributes`属性，其值为一个属性名的数组，且如果任何这些命名属性在这个自定义元素的一个实例上被设置（或修改），浏览器就会调用`attributeChangedCallback()`方法，传入属性名、旧值和新值。这个回调可以根据属性值的变化采取必要的步骤以更新组件。

自定义元素类也可以按照需要定义其他属性和方法。通常，它们都会定义设置方法和获取方法，让元素的属性可以暴露为JavaScript属性。

下面举一个自定义元素的例子。假设我们想在一个常规文本段落中显示圆圈。我希望可以像下面这样写 HTML，以提出图 15-4 所示的数学故事问题：

```html
<p>
    Thedocument has one marble:<inline-circle></inline-circle>.
    TheHTML parser instantiates two more marbles:
    <inline-circle diameter="1.2em" color="blue"></inline-circle>
    <inline-circle diameter=".6em"color="gold"></inline-circle>.
    How many marbles does the document contain now?
</p>
```

![image-20240826230153163](https://blog-wjw.oss-cn-hangzhou.aliyuncs.com/blog/image-20240826230153163.png)

`<inline-circle>`自定义元素的代码如下：

```js
customElements.define("inline-circle", class InlineCircle extends HTMLElement {
    // 浏览器会在一个<inline-circle>元素被插入文档时
    // 调用这个方法。还有一个disconnectedCallback（)
    // 方法，但这个例子中没有用到。
    connectedCallback() {
        // 设置创建圆圈所需的样式
        this.style.display = "inline-block";
        this.style.borderRadius = "50%";
        this.sytle.border = "solid black 1px";
        this.style.transform = "translateY(10%)";
        if (!this.style.width) {
            this.style.width = "0.8em";
            this.style.height = "0.8em";
        }
    }
    
    // 这个静态的observedAttributes属性用于指定我们
    // 想在哪个属性变化时收到通知（这里使用了
    // 获取方法，是因为只能对方法使用static关键字）
    static get observedAttributes() {
        return ["diameter", "color"];
    }
    
    // 这个回调会在上面列出的属性变化时被调用，
    // 从自定义元素被解析开始，包括之后的变化
    attributeChangedCallback(name, oldValue, newValue) {
        switch(name) {
            case "diameter":
                // 如果diameter属性改变了，更新大小样式
                this.style.width = newValue;
                this.style.height = newValue;
                break;
            case "color":
                // 如果color属性改变了，更新颜色样式
                this.style.backgroundColor = newValue;
                break;
        }
    }
    
    // 定义与元素的标签属性对应的JavaScript属性
    // 这些获取和设置方法只是获取和设置底层属性
    // 如果设置了JavaScript的属性，则修改底层的
    // 属性会触发调用attributeChangedCallback()
    // 进而更新元素的样式
    get diameter() {
        return this.getAttribute("diameter");
    }
    set diameter(diameter) {
        this.setAttribute("diameter", diameter);
    }
    get color() {
        return this.getAttribute("color");
    }
    set color(color) {
        this.setAttribute("color", color);
    }
});
```

### 15.6.4 影子 DOM
