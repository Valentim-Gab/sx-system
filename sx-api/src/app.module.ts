import { Module } from '@nestjs/common'
import { UserModule } from './entities/user/user.module'
import { AuthModule } from './security/auth/auth.module'
import { PrismaModule } from 'nestjs-prisma'
import { ConfigModule } from '@nestjs/config'
import { BlogModule } from './entities/blog/blog.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { mailerConfig } from './config/mailer.config'
import { SiteConfigModule } from './entities/site-config/site-config.module'
import configuration from './config/configuration'

@Module({
  imports: [
    AuthModule,
    UserModule,
    BlogModule,
    SiteConfigModule,
    PrismaModule.forRoot(),
    MailerModule.forRoot(mailerConfig),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
})
export class AppModule {}
