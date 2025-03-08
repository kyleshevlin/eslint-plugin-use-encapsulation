export default {
  entry: ['index.js'],
  format: ['cjs', 'esm'],
  clean: true,
  outDir: 'dist',
  treeshake: true,
  splitting: false,
  bundle: true,
  dts: false
}