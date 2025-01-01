import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'
import { ImageUtil } from 'src/utils/image-util/image.util'
import { siteConfig } from '@prisma/client'
import { Response } from 'express'
import { DefaultImageSaveStrategy } from 'src/utils/image-util/strategies/default-image-save.strategy'

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
    const siteConfig = await this.findFirst()
    const strategy = new DefaultImageSaveStrategy(this.imageUtil)
    this.imageUtil.setSaveStrategy(strategy)
    const filename = await this.imageUtil.save(image, 'main_avatar', 'blog')

    return this.prismaUtil.performOperation(
      'Não foi possível atualizar seu avatar',
      async () => {
        return this.prisma.siteConfig.upsert({
          where: { idSiteConfig: siteConfig ? siteConfig.idSiteConfig : 1 },
          update: { mainAvatar: filename },
          create: { mainAvatar: filename },
        })
      },
    )
  }
}
