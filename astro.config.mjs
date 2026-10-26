// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // Apex domain. www.houseofray.art 301s here at the edge, so every canonical,
  // sitemap entry and absolute URL must use this origin.
  site: 'https://houseofray.art',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});
