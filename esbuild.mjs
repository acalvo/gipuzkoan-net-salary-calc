import child_process from 'child_process';
import esbuild from 'esbuild';
import fs from 'fs';
import htmlPlugin from '@chialab/esbuild-plugin-html';

const devServer = process.argv.slice(2).includes('--serve');

const OUT_DIR = devServer ? './tmp' : './dist';

if (devServer) {
  const server = child_process.exec(`npx http-server -c-1 ${OUT_DIR}`);
  process.on('exit', () => server.kill());
}

fs.rmSync(OUT_DIR, { recursive: true, force: true });

await esbuild.build({
  entryPoints: ['src/index.html'],
  outdir: OUT_DIR,
  bundle: true,
  minify: !devServer,
  sourcemap: devServer,
  watch: devServer,
  chunkNames: devServer ? 'bundle' : 'bundle.[hash]',
  plugins: [
    htmlPlugin(),
  ],
});
