import buble from 'rollup-plugin-buble';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/ass-compiler.js',
    format: 'umd',
    name: 'assCompiler',
  },
  plugins: [
    buble(),
  ],
};
