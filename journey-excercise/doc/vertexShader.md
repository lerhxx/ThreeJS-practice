## gl_PointSize

核心作用是：控制点图元（GL_POINTS）在屏幕上渲染时的大小（直径），以像素为单位。

``` glsl
// 根据顶点到摄像机的距离调整大小
float dist = length(viewMatrix * vec4(position, 1.0));
gl_PointSize = 100.0 / dist; 
```

###  重要限制（特别注意）

- 有最大值限制：显卡不允许点无限大。查询上限方式：

``` glsl
const maxSize = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE);
console.log(maxSize); // 输出 [最小尺寸, 最大尺寸]，例如 [1, 64]
```
 如果设置的值超过上限，会被截断为最大值。

- 不同硬件差异大：桌面显卡通常支持到 64 或 128 像素；移动端（WebGL）很多只支持到 64 像素，甚至部分只支持到 1（即无法改变大小）。

- 实际渲染形状：默认光栅化会把点渲染成方形。如果你需要圆形的点，必须在片元着色器中通过判断距离中心的距离来丢弃像素（discard）。

### 片元着色器中的配合（重要）

__设置了 gl_PointSize 后__，片元着色器中会出现一个特殊内置变量 gl_PointCoord，它表示当前片元在点方块内的坐标（__范围 0.0 ~ 1.0__）。利用它可以绘制圆点或纹理：

```glsl
// 片元着色器 - 画一个圆点
void main() {
    vec2 center = vec2(0.5, 0.5);
    float dist = distance(gl_PointCoord, center);
    if (dist > 0.5) discard; // 超出圆形部分丢弃
    
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
```

### 核心应用场景

- 粒子系统（星空、火焰、雪花）

- 数据可视化（散点图、点云）

- UI 标记（地图上的定位点）

- 小尺寸特效（光晕、闪烁星星），如 fragmentShaders/34.js.