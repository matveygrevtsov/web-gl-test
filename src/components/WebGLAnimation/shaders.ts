// vertexShader - вершинный шейдер.
// attribute - это способ передать данные из самой программы в шейдер.
// Атрибуты можно использовать только в вершинном шейдере
// Функция main() вершинного шейдера создаёт вершины по полученным данным.
// В gl_Position последний аргумент - это нормирование w. То есть каждое значение (x, y, z) будет поделено на w.

export const vertexShaderCode = `
attribute vec3 vertexPosition;
attribute vec3 vertexColor;

varying vec3 fragColor;

void main() {
    fragColor = vertexColor;
    gl_Position = vec4(vertexPosition, 1);
}
`

// Для fragmentShader нужно сначала задать точность (precision) для числе с плавающей точкой.
// Нам доступны 3 диапозона точности: lowp [-2,2], mediump [-2^14, 2^14], highp [-2^62, 2^62].
// Чем выше точность - тем хуже производительность.
// Передавать данные из программы в fragmentShader мы можем через Uniform переменные, текстуры и Varying переменные.
// Varying переменные передают данные из вершинного шейдера во фрагментный, при этм значения интерполируются (немного изменяются).

export const fragmentShaderCode = `
precision mediump float;

varying vec3 fragColor;

void main() {
    gl_FragColor = vec4(fragColor, 1.0);
}
`
