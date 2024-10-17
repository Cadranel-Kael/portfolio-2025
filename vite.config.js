import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/style/app.scss',
                'resources/ts/app.ts',
                'resources/images/favicon-32x32.png',
                'resources/images/favicon-16x16.png',
                'resources/images/apple-touch-icon.png',
                'resources/images/site.webmanifest',

                // Control Panel assets.
                // https://statamic.dev/extending/control-panel#adding-css-and-js-assets
                // 'resources/css/cp.css',
                // 'resources/js/cp.js',
            ],
            refresh: true,
        }),
        // vue2(),
    ],
});
