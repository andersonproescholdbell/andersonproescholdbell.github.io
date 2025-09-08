// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://andersonproescholdbell.github.io',

  redirects: {
    // Legacy urls
    '/floatsV1/index.html': '/counter-strike/floats-v1/',
    '/floatsV3/index.html': '/counter-strike/floats-v3/',
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '/scripts': fileURLToPath(new URL('./src/scripts', import.meta.url))
      }
    }
  }
});