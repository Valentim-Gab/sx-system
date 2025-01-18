import { Module } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'
import { MessageController } from './message.controller'
import { MessageService } from './message.service'

@Module({
  controllers: [MessageController],
  providers: [MessageService, PrismaService, PrismaUtil],
})
export class MessageModule {}
