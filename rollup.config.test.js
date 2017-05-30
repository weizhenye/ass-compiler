import istanbul from 'rollup-plugin-istanbul';

export default {
  entry: 'test/test.js',
  format: 'cjs',
  dest: 'temp/test.js',
  external: ['chai'],
  plugins: [
    istanbul({ exclude: ['test/**/*'] }),
  ],
};
