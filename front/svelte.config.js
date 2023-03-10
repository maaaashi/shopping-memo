import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-auto";
// import adapter from '@sveltejs/adapter-vercel';
// import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from "@sveltejs/kit/vite";
/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    preprocess({
      postcss: true,
    }),
  ],

  kit: {
    adapter: adapter(),
    alias: {
      '$components': 'src/components',
      '$types': 'src/types',
      '$store': 'src/store',
    }
  },
};

export default config;
