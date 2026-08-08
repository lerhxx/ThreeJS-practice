## 顶点变换流水线图解

```text
[局部坐标] --modelMatrix--> [世界坐标] --viewMatrix--> [视图坐标] 
--projectionMatrix--> [裁剪坐标] --透视除法--> [NDC] --视口变换--> [屏幕像素]
```

```glsl
// 顶点着色器
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

attribute vec3 position;

void main() {
    // 标准变换流水线
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    // 直接使用 MVP（最快）
    gl_Position = modelViewProjectionMatrix * vec4(position, 1.0);
}
```

### 各阶段说明

| 阶段	| 坐标范围	| 说明
| -- | -- | -- |
| 裁剪坐标（gl_Position）	| [-w, w]	| 你赋值的位置，w 通常是 1.0 或深度值
| NDC（透视除法后）	| [-1, 1]	| GPU 自动执行 (x/w, y/w, z/w)
| 屏幕坐标（视口变换后）	| [0, width] × [0, height]	| gl.viewport 映射

## 常用矩阵组合命名

| 变量名	| 组合方式	| 用途 |
|-------|-------|-------|
| modelMatrix	| 单独的模型矩阵	| 计算世界坐标 |
| viewMatrix	| 单独的视图矩阵	| 计算视图坐标 |
| modelViewMatrix	| viewMatrix * modelMatrix	| 减少一次乘法 |
| projectionMatrix	| 单独的投影矩阵	| 投影变换 |
| modelViewProjectionMatrix	| projectionMatrix * viewMatrix * modelMatrix	| 最常用，性能最优 |
| normalMatrix	|inverse(transpose(mat3(modelViewMatrix)))	| 法线变换 |

### modelMatrix
是 __3D 图形学中物体变换的核心矩阵__，它的作用是：__将顶点从局部坐标系（模型本地坐标）转换到世界坐标系__。

Three.ShaderMaterial 提供的内置 uniforms，使用 Three.RawShaderMaterial 需要自定义 uniform 变量;

### 基本概念

```text
局部坐标 (Local) --[modelMatrix]--> 世界坐标 (World)
```

modelMatrix 包含了三个变换的组合（按顺序）：

- 缩放（Scale）- 让物体变大或变小

- 旋转（Rotation）- 让物体朝向某个方向

- 平移（Translation）- 让物体移动到某个位置

关键点：变换顺序是 __先缩放 → 再旋转 → 最后平移（矩阵乘法从右到左执行）__。

## gl_Position

是 __GLSL 顶点着色器中的核心内置输出变量__，它的作用是：

__将顶点从模型局部坐标系转换到裁剪坐标系（Clip Coordinates），这是顶点着色器必须赋值的变量__。

### 与 gl_PointSize 的区别

| 变量	| 作用阶段	| 作用对象	| 类型 |
| -- | -- | -- | -- |
| gl_Position	| 顶点着色器	| 所有图元（点、线、三角形）	| vec4 |
| gl_PointSize | 顶点着色器	| 仅点图元（GL_POINTS）	| float |

```glsl
// 同时使用两者
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = 10.0;  // 仅当绘制 GL_POINTS 时生效
}
```

### 性能优化建议

- 使用合并矩阵: MVP
- 减少 uniform 数量：不用的矩阵不要传入
- 避免在顶点着色器做复杂计算：尽量在 CPU 预计算
- 使用 highp 精度（移动端）：precision highp float;

### 总结

- gl_Position 是必须赋值的顶点着色器输出

- 它处于__裁剪空间__，范围是 [-w, w]

- GPU __自动执行透视除法__（除以 w）得到 NDC

- 矩阵乘法顺序：projection * view * model * vertex

- Three.js 提供 modelViewProjectionMatrix 简化操作

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