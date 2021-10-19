import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { htmlTemplatePlugin } from './config/htmlTemplatePlugin';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: [
        react(),
        htmlTemplatePlugin(),
        // https://vite-plugin-pwa.netlify.app/guide/
        VitePWA({
            includeAssets: ['favicon.ico', 'robots.txt', 'logo192.png'],
            manifest: {
                name: 'Kyker',
                short_name: 'Kyker',
                description: 'A website for sharing animal spottings in Kruger National Park',
                theme_color: '#1A202C',
                background_color: '#EDEEEE',
                icons: [
                    {
                        src: 'favicon.ico',
                        sizes: '64x64 32x32 24x24 16x16',
                        type: 'image/x-icon'
                    },
                    {
                        src: 'logo192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'logo512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: [
            {
                find: /^react-mapbox-gl/,
                replacement: 'react-mapbox-gl/lib'
            }
        ]
    }
});
