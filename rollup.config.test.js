import multiEntry from 'rollup-plugin-multi-entry';
import istanbul from 'rollup-plugin-istanbul';

export default {
  input: 'test/**/*.js',
  output: {
    file: 'temp/test.js',
    format: 'cjs',
  },
  external: ['chai'],
  plugins: [
    multiEntry(),
    istanbul({ exclude: ['test/**/*'] }),
  ],
};
