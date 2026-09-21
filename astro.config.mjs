import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://kisselremodeling.com',
  integrations: [
    // Base styles are applied via src/styles/global.css (imported in BaseLayout)
    tailwind({ applyBaseStyles: false }),
    sitemap({
      // /thank-you is noindex (form success page) — keep it out of the sitemap
      filter: (page) => !page.includes('/thank-you'),
    }),
  ],
});
