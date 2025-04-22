import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';
import registrationModule from './registration/registration.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use(registrationModule);

  if (isDev) {
    const vite = await createViteServer({
      configFile: path.resolve(__dirname, '../vite.config.js'),
      server: { middlewareMode: true }
    });
    app.locals.vite = vite;
    app.use(vite.middlewares);
  }

  if (isProd) {
    const distDir = path.resolve(__dirname, '../dist');

    app.use(express.static(distDir));
  }

  app.use((req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({
        message: 'API não encontrada'
      });
    }

    res.status(404).send('Página não encontrada');
  });

  app.listen(PORT, () =>
    console.log(`🚀  http://localhost:${PORT}/registration  (${isProd ? 'prod' : 'dev'})`)
  );
}

bootstrap();
