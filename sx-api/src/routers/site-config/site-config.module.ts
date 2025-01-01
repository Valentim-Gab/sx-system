import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'
import { SiteConfigController } from './site-config.controller'
import { SiteConfigService } from './site-config.service'
import { ImageUtil } from 'src/utils/image-util/image.util'

@Module({
  controllers: [SiteConfigController],
  providers: [SiteConfigService, PrismaService, PrismaUtil, ImageUtil],
})
export class SiteConfigModule {}
