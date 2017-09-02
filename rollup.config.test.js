import istanbul from 'rollup-plugin-istanbul';

export default {
  input: 'test/test.js',
  output: {
    file: 'temp/test.js',
    format: 'cjs',
  },
  external: ['chai'],
  plugins: [
    istanbul({ exclude: ['test/**/*'] }),
  ],
};
