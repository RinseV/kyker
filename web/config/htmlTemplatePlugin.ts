import type { Plugin, ViteDevServer } from 'vite';
import { promises as fs } from 'fs';

export const htmlTemplatePlugin = (): Plugin => {
    return {
        name: 'html-template',
        configureServer(server: ViteDevServer) {
            return () => {
                server.middlewares.use(async (req, res, next) => {
                    if (!req.url?.endsWith('.html') && req.url !== '/') {
                        return next();
                    }
                    const templatePath = 'index.html';

                    const originalContent = await fs.readFile(templatePath, { encoding: 'utf8' });

                    let content = originalContent.replace('%PUBLIC_URL%', `http://${req.headers.host}`);

                    // using vite's transform html function to add basic html support
                    content = await server.transformIndexHtml?.(req.url, content, req.originalUrl);

                    res.end(content);
                });
            };
        },
        transformIndexHtml: (html, ctx) => {
            if (ctx.server) {
                return html;
            }

            return html.replace('%PUBLIC_URL%', `${process.env.BASE_URL ?? ''}`);
        }
    };
};
