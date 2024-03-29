import path from 'node:path';
import { createRequire } from 'node:module';
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy';

const require = createRequire(import.meta.url);
const cMapsDir = path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps');
const standardFontsDir = path.join(
  path.dirname(require.resolve('pdfjs-dist/package.json')),
  'standard_fonts',
);
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteStaticCopy({
    targets: [
      { src: cMapsDir, dest: '' },
      { src: standardFontsDir, dest: '' },
    ],
  }),],
  define: {
    'process.env.VITE_ENVIROMENT': JSON.stringify(process.env.VITE_ENVIROMENT),
  },
  build: {
    target: 'ES2022',
  }
})
