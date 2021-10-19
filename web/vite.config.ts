import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { htmlTemplatePlugin } from './config/htmlTemplatePlugin';

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
    plugins: [react(), htmlTemplatePlugin()],
    resolve: {
        alias: [
            {
                find: /^react-mapbox-gl/,
                replacement: 'react-mapbox-gl/lib'
            }
        ]
    }
});
