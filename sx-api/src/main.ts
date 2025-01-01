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
      'https://tauri.localhost/',
      'app://localhost',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['content-Type', 'set-cookie', 'Authorization'],
  })

  app.use(cookieParser())

  await app.listen(3001)
}
bootstrap()