import typescript from 'rollup-plugin-typescript2'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
// import postcss from 'rollup-plugin-postcss-modules'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  external: ['react','react-dom'],
  plugins: [
    external(),
    postcss({
      modules: true
    }),
    url(),
    svgr(),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs({
      include: ['node_modules/**', '../../node_modules/**'],
      // left-hand side can be an absolute path, a path
      // relative to the current directory, or the name
      // of a module in node_modules
      namedExports: {
        '../../node_modules/react/index.js': [
          'cloneElement',
          'createContext',
          'Component',
          'createElement'
        ],
        '../../node_modules/react-dom/index.js': ['render', 'hydrate'],
        '../../node_modules/react-is/index.js': [
          'isElement',
          'isValidElementType',
          'ForwardRef'
        ],
        '../../node_modules/react-spinners/index.js': ['BarLoader', 'ClipLoader']
      }
    })
  ]
}
