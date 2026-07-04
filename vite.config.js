import { defineConfig } from 'vite';

export default defineConfig({
  // GitHub Pages serves the site at /vayu/; local dev stays at /
  base: process.env.GITHUB_PAGES ? '/vayu/' : '/',
  server: {
    host: true,
    port: 5173,
  },
  build: {
    target: 'es2019',
    cssMinify: true,
  },
});
