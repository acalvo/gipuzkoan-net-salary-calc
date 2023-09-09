import * as esbuild from 'esbuild';
import htmlPlugin from '@chialab/esbuild-plugin-html';

const devServer = process.argv.slice(2).includes('--serve');

const OUT_DIR = devServer ? './tmp' : './dist';

const options = {
  entryPoints: ['src/index.html'],
  outdir: OUT_DIR,
  bundle: true,
  minify: !devServer,
  sourcemap: devServer,
  chunkNames: devServer ? 'bundle' : 'bundle.[hash]',
  plugins: [
    htmlPlugin(),
  ],
};

if (!devServer) {
  await esbuild.build(options);
} else {
  let ctx = await esbuild.context(options);
  let { port } = await ctx.serve({
    servedir: OUT_DIR,
    port: 8080,
  });
  console.log(`Running on http://localhost:${port}`);
}
