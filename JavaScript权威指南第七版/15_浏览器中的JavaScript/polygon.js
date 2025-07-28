/**
 * 定义 n 边的普通多边形，以 (x, y) 为中心，r 为半径
 * 顶点沿圆形周长间隔相同的距离
 * 第一个顶点放在正上方，或者放在指定的角度上
 * 顺时针旋转，除非最后一个参数为 true
 */
function polygon(c, n, x, y, r, angle=0, counterclockwise=false) {
    c.moveTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
    let delta = 2 * Math.PI / n;  // 顶点间的角度距离
    for (let i = 1; i < n; i++) {
        angle += counterclockwise ? -delta : delta; // 调整角度
        c.lineTo(x + r * Math.sin(angle), y - r * Math.cos(angle));
    }
    c.closePath();
}

let c = document.querySelector("#canvas").getContext("2d");

c.beginPath();
polygon(c, 3, 50, 70, 50);  // 三角形
polygon(c, 4, 150, 60, 50, Math.PI / 4);  // 正方形
polygon(c, 5, 255, 55, 50);  // 五边形
polygon(c, 6, 365, 53, 50, Math.PI / 6);  // 六边形
polygon(c, 4, 365, 53, 20, Math.PI / 4, true);  // 六边形中再画一个正方形

c.fillStyle = "#ccc";  // 内部浅灰色
c.strokeStyle = "#008";  // 轮廓深蓝色
c.lineWidth = 5;  // 宽度5像素

c.fill();
c.stroke();
