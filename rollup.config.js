import typescript from 'rollup-plugin-typescript2'
// import { terser } from 'rollup-plugin-terser'
import { dts } from 'rollup-plugin-dts'

export default () => {
  const template = function (fileName) {
    return {
      input: `./src/${fileName}.ts`,
      output: [
        {
          format: 'cjs',
          file: `lib/${fileName}.js`,
          name: fileName,
        }
      ],
      plugins: [
        typescript(
          {
            exclude: 'node_modules/**',
            typescript: require('typescript')
          }
        )
      ]
    }
  }

  const moduleNames = ['index']
  const config = []

  moduleNames.forEach((mouldeName) => {
    config.push(template(mouldeName))
  })

  // config.forEach(val => {
  //   val.plugins.push(
  //     terser({
  //       mangle: false
  //     }))
  // })
  config.push({
    input: './src/index.ts',
    output: [{ file: 'lib/index.d.ts', format: 'cjs' }],
    plugins: [dts()]
  })
  return config
}
