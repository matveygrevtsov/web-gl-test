import { vertexShaderCode, fragmentShaderCode } from './shaders'

interface Props {
  canvas: HTMLCanvasElement
}

export class Animator {
  private readonly canvas: HTMLCanvasElement

  constructor({ canvas }: Props) {
    this.canvas = canvas
  }

  public async start() {
    const gl = this.canvas.getContext('webgl')
    if (!gl) return console.log('Ваш браузер не поддерживает WebGL')

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

    if (!vertexShader || !fragmentShader)
      return console.log('Ваш браузер не поддерживает WebGL')

    const { clientWidth, clientHeight } = gl.canvas
    this.canvas.width = clientWidth
    this.canvas.height = clientHeight
    gl.viewport(0, 0, clientWidth, clientHeight)

    gl.shaderSource(vertexShader, vertexShaderCode)
    gl.shaderSource(fragmentShader, fragmentShaderCode)

    gl.compileShader(vertexShader)
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS))
      return console.log(
        'Error compiling vertexShader shader!',
        gl.getShaderInfoLog(vertexShader),
      )

    gl.compileShader(fragmentShader)
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS))
      return console.log(
        'Error compiling fragmentShader shader!',
        gl.getShaderInfoLog(fragmentShader),
      )

    const program = gl.createProgram()
    if (!program) return console.log('Ваш браузер не поддерживает WebGL')
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)
    gl.validateProgram(program)

    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
      return console.log(
        'Error validating program',
        gl.getProgramInfoLog(program),
      )

    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)

    const vertexArray = [
      // ТРЕУГОЛЬНИК 1 (КРАСНЫЙ)
      0.0, // вершина1 x
      0.3, // вершина1 y
      0.0, // вершина1 z
      1.0, // вершина1 r
      0.0, // вершина1 g
      0.0, // вершина1 b
      0.5, // вершина2 x
      -0.8, // вершина2 y
      0.0, // вершина2 z
      1.0, // вершина2 r
      0.0, // вершина2 g
      0.0, // вершина2 b
      -0.5, // вершина3 x
      -0.8, // вершина3 y
      0.0, // вершина3 z
      1.0, // вершина3 r
      0.0, // вершина3 g
      0.0, // вершина3 b

      // ТРЕУГОЛЬНИК 2 (СИНИЙ)
      0.0, // вершина1 x
      -0.3, // вершина1 y
      0.5, // вершина1 z
      0.0, // вершина1 r
      0.0, // вершина1 g
      1.0, // вершина1 b
      0.5, // вершина2 x
      0.8, // вершина2 y
      0.5, // вершина2 z
      0.0, // вершина2 r
      0.0, // вершина2 g
      1.0, // вершина2 b
      -0.5, // вершина3 x
      0.8, // вершина3 y
      0.5, // вершина3 z
      0.0, // вершина3 r
      0.0, // вершина3 g
      1.0, // вершина3 b
    ]

    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(vertexArray),
      gl.STATIC_DRAW,
    )

    // ПЕРЕДАЁМ ДАННЫЕ ИЗ БУФЕРА (ПОЗИЦИЮ) В ВЕРШИННЫЙ ШЕЙДЕР [НАЧАЛО]

    // создаём ссылку на аттрибут
    const positionAttribLocation = gl.getAttribLocation(
      program,
      'vertexPosition',
    )

    // Укажем, каким именно способом нужно передать данные из буфера
    gl.vertexAttribPointer(
      positionAttribLocation, // ссылка на аттрибут
      3, // кол-во элементов массива на одну итерацию
      gl.FLOAT, // тип данных
      false,
      6 * Float32Array.BYTES_PER_ELEMENT, // кол-во элементов массива на одну вершину
      0 * Float32Array.BYTES_PER_ELEMENT,
    )

    gl.enableVertexAttribArray(positionAttribLocation)
    // [КОНЕЦ]

    // ПЕРЕДАЁМ ДАННЫЕ ИЗ БУФЕРА (ЦВЕТ) В ВЕРШИННЫЙ ШЕЙДЕР [НАЧАЛО]
    // создаём ссылку на аттрибут
    const colorAttribLocation = gl.getAttribLocation(program, 'vertexColor')

    // Укажем, каким именно способом нужно передать данные из буфера
    gl.vertexAttribPointer(
      colorAttribLocation, // ссылка на аттрибут
      3, // кол-во элементов массива на одну итерацию
      gl.FLOAT, // тип данных
      false,
      6 * Float32Array.BYTES_PER_ELEMENT, // кол-во элементов массива на одну вершину
      3 * Float32Array.BYTES_PER_ELEMENT,
    )

    gl.enableVertexAttribArray(colorAttribLocation)
    // [НАЧАЛО]

    gl.clearColor(0.75, 0.9, 1.0, 1.0) // устанавливаем цвет холста
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT) // очистим буффер цвета и буффер глубины
    gl.enable(gl.DEPTH_TEST)
    gl.useProgram(program)
    gl.drawArrays(gl.TRIANGLES, 0, 6) // отрисовываем фигуру при помощи данных, находящихся в буффере
    // Второй аргумент (0) - это стартовый индекс массива, последний параметр - кол-во вершин
  }

  public destroy() {}
}
