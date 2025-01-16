import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'
import { ImageUtil } from 'src/utils/image-util/image.util'
import { siteConfig } from '@prisma/client'
import { Response } from 'express'
import { DefaultImageSaveStrategy } from 'src/utils/image-util/strategies/default-image-save.strategy'
import { ID_SITE_CONFIG } from 'src/constants/site-config.constant'
import { UpdateSiteConfigDto } from './dto/update-site-config.dto'

@Injectable()
export class SiteConfigService {
  constructor(
    private prisma: PrismaService,
    private prismaUtil: PrismaUtil,
    private imageUtil: ImageUtil,
  ) {}

  async findFirst(): Promise<siteConfig | null> {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar a mensagem',
      async () => {
        return await this.prisma.siteConfig.findFirst()
      },
    )
  }

  async findMainAvatar(res: Response) {
    const siteConfig = await this.findFirst()

    try {
      const bytes = await this.imageUtil.get(siteConfig.mainAvatar, 'blog')

      res.setHeader('Content-Type', 'image/*')
      res.send(bytes)
    } catch (error) {
      throw new BadRequestException(`Foto não encontrada`)
    }
  }

  async updateMainAvatar(image: Express.Multer.File) {
    const strategy = new DefaultImageSaveStrategy(this.imageUtil)
    this.imageUtil.setSaveStrategy(strategy)
    const filename = await this.imageUtil.save(image, 'main_avatar', 'blog')

    return this.prismaUtil.performOperation(
      'Não foi possível atualizar seu avatar',
      async () => {
        return this.prisma.siteConfig.upsert({
          where: { idSiteConfig: ID_SITE_CONFIG },
          update: { mainAvatar: filename },
          create: { mainAvatar: filename },
        })
      },
    )
  }

  async update(siteConfig: UpdateSiteConfigDto) {
    return this.prismaUtil.performOperation(
      'Não foi possível atualizar as configurações do site',
      async () => {
        return this.prisma.siteConfig.update({
          data: siteConfig,
          where: { idSiteConfig: ID_SITE_CONFIG },
        })
      },
    )
  }
}
