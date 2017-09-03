import buble from 'rollup-plugin-buble';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/ass-compiler.js',
    format: 'umd',
    moduleName: 'assCompiler',
  },
  plugins: [
    replace({
      'Number.isNaN': 'isNaN',
    }),
    buble(),
  ],
};
