import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:1420',
      'http://localhost:9001',
      'https://tauri.localhost',
      'app://localhost',
      'https://sx-system-web.vercel.app',
      'https://sx.valentim.software',
      'https://elisajacques.blog',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'set-cookie', 'Authorization'],
  })

  app.use(cookieParser())

  await app.listen(3003)
}
bootstrap()
