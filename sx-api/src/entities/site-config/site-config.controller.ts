import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { JwtAuthGuard } from 'src/security/guards/jwt-auth.guard'
import { RolesGuard } from 'src/security/guards/roles.guard'
import { Roles } from 'src/decorators/roles.decorator'
import { Role } from 'src/enums/Role'
import { ReqUser } from 'src/decorators/req-user.decorator'
import { users } from '@prisma/client'
import { FileInterceptor } from '@nestjs/platform-express'
import { SiteConfigService } from './site-config.service'
import { Response } from 'express'
import { UpdateSiteConfigDto } from './dto/update-site-config.dto'

@Controller('site')
export class SiteConfigController {
  constructor(private readonly siteConfigService: SiteConfigService) {}

  @Get()
  get() {
    return this.siteConfigService.findFirst()
  }

  @Get('main-avatar')
  downloadMainAvatar(@ReqUser() user: users, @Res() res: Response) {
    return this.siteConfigService.findMainAvatar(res)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Patch('main-avatar')
  @UseInterceptors(
    FileInterceptor('main-avatar', {
      limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
      },
    }),
  )
  uploadMainAvatar(@UploadedFile() image: Express.Multer.File) {
    return this.siteConfigService.updateMainAvatar(image)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User, Role.Admin)
  @Put()
  update(@Body() siteConfig: UpdateSiteConfigDto) {
    return this.siteConfigService.update(siteConfig)
  }
}
