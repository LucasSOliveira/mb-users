import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer as createViteServer } from 'vite';

// Usar importação normal depois que os aliases são registrados
import registrationModule from './registration/registration.module.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT;
const isProd = process.env.NODE_ENV === 'production';
const isDev = process.env.NODE_ENV === 'development';

async function bootstrap() {
  const app = express();

  app.use(express.json());
  app.use('/registration', registrationModule);

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
    app.use( express.static(distDir));
  }

  app.use((_, res) => res.status(404).send('Página não encontrada'));

  app.listen(PORT, () =>
    console.log(`🚀  http://localhost:${PORT}  (${isProd ? 'prod' : 'dev'})`)
  );
}

bootstrap();
