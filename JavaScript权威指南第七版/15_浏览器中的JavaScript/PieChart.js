/**
 * 创建一个 <svg> 元素并在其中绘制一个饼图
 * 
 * 这个函数接收一个对象参数，包含下列属性：
 * 
 *      width, height: SVG 图形的大小，以像素为单位
 *      cx, cy, r: 饼图的圆心和半径
 *      lx, ly: 图例的左上角坐标
 *      data: 对象，其属性名是数据标签，属性值是对应的值
 * 
 * 这个函数返回一个 <svg> 元素。调用者必须把它插入文档
 * 才可以看到饼图
 */
function pieChart(options) {
    let {width, height, cx, cy, r, lx, ly, data} = options;

    // 这是 SVG 元素的 XML 命名空间
    let svg = "http://www.w3.org/2000/svg";

    // 创建 <svg> 元素，指定像素大小及用户坐标
    let chart = document.createElementNS(svg, "svg");
    chart.setAttribute("width", width);
    chart.setAttribute("height", height);
    chart.setAttribute("viewBox", `0 0 ${width} ${height}`);

    // 定义饼图的文本样式。如果不在这里设置这些值也可以使用 CSS 来设置
    chart.setAttribute("font-family", "sans-serif");
    chart.setAttribute("font-size", "18");

    // 取得数组形式的标签和值，并计算所有值的总和从而知道这张饼到底有多大
    let labels = Object.keys(data);
    let values = Object.values(data);
    let total = values.reduce((x, y) => x + y);

    // 计算每个户型的角度。户型 i 的起始角度为 angles[i]
    // 结束角度为 angles[i+1]。这里角度以弧度表示
    let angles = [0];
    values.forEach((x, i) => angles.push(angles[i] + x/total * 2 * Math.PI));

    // 现在遍历饼图的所有扇形
    values.forEach((value, i) => {
        // 计算扇形相接的两点
        // 下面的公式可以保证角度 0 为 12 点方向，正角度顺时针增长
        let x1 = cx + r * Math.sin(angles[i]);
        let y1 = cy - r * Math.cos(angles[i]);
        let x2 = cx + r * Math.sin(angles[i+1]);
        let y2 = cy - r * Math.cos(angles[i+1]);

        // 这是一个表示角度大于半圆的标志
        // 它对于 SVG 弧形绘制组件是必需的
        let big = (angles[i+1] - angles[i] > Math.PI) ? 1 : 0;

        // 描述如何绘制饼图中一个扇形的字符串
        let path= `M${cx},${cy}` +     // 移动到圆心
            `L${x1},${y1}` +  // 画一条直线到(x1, y1)
            `A${r},${r} 0 ${big} 1 ${x2},${y2}`+  // 画一条半径为r的圆弧，圆弧终点为(x2, y2)
            "Z";  // 在(cx, cy)点关闭路径

        // 计算这个扇形的 CSS 颜色。这个公式只适合计算约 15 种
        // 颜色，因此不要在一个饼图中包含超过 15 个扇形
        let color = `hsl(${(i*40)%360},${90-3*i}%,${50+2*i}%)`;

        // 使用 <path> 元素描述每一个扇形，注意 createElementNS()
        let slice = document.createElementNS(svg, "path");

        // 现在设置 <path> 元素的属性
        slice.setAttribute("d", path);  // 设置当前扇形的路径
        slice.setAttribute("fill", color);  // 设置扇形的颜色 
        slice.setAttribute("stroke", "black");  // 扇形轮廓线为黑色
        slice.setAttribute("stroke-width", "1");  // 宽度为 1 CSS 像素
        chart.append(slice);  // 把扇形添加到饼图

        // 现在为对应的键画一个匹配的小方块
        let icon = document.createElementNS(svg, "rect");
        icon.setAttribute("x", lx);  // 定位小方块
        icon.setAttribute("y", ly + 30*i);
        icon.setAttribute("width", 20);  // 设置大小
        icon.setAttribute("height", 20);
        icon.setAttribute("fill", color);  // 与扇形相同的填充色
        icon.setAttribute("stroke", "black");  // 相同的描边颜色
        icon.setAttribute("stroke-width", "1");
        chart.append(icon); // 把图标添加到饼图

        // 在小方块右侧添加一个标签
        let label = document.createElementNS(svg, "text");
        label.setAttribute("x", lx + 30);  // 定位文本
        label.setAttribute("y", ly + 30*i + 16);
        label.append(`${labels[i]} ${value}`); // 把文本添加到标签
        chart.append(label); // 把标签添加到饼图
    });

    return chart;
}