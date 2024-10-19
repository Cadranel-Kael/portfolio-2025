import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/style/app.scss',
                'resources/ts/app.ts',
                'resources/images/*',

                // Control Panel assets.
                // https://statamic.dev/extending/control-panel#adding-css-and-js-assets
                // 'resources/css/cp.css',
                // 'resources/js/cp.js',
            ],
            refresh: true,
        }),
        // vue2(),
    ],
    build: {
        manifest: true,  // Generate a manifest file with hashed assets
        outDir: 'public/build',  // Define the output directory
        rollupOptions: {
            output: {
                entryFileNames: '[name].[hash].js',  // Enable cache busting by hashing JS files
                chunkFileNames: '[name].[hash].js',
                assetFileNames: '[name].[hash].[ext]',  // Hash other assets like CSS, fonts, images
            },
        },
    },
});
