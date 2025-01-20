import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'
import { format } from 'date-fns-tz'
import { formatDateTimeSaoPaulo } from 'src/utils/date.util'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessageDate } from 'src/interfaces/message.interface'

@Injectable()
export class MessageService {
  constructor(
    private prisma: PrismaService,
    private prismaUtil: PrismaUtil,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    return this.prismaUtil.performOperation(
      'Não foi possível cadastrar a mensagem',
      async () => {
        const data = await this.prisma.message.create({
          data: createMessageDto,
        })

        data.dateMessage = formatDateTimeSaoPaulo(data.dateMessage)

        return data
      },
    )
  }

  async findAll(): Promise<MessageDate[]> {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar pelas mensagens',
      async () => {
        const data = await this.prisma.message.findMany()

        const msgs: MessageDate[] = data.map((message) => {
          return {
            ...message,
            dateMessage: formatDateTimeSaoPaulo(message.dateMessage),
            formatDate: {
              date: format(message.dateMessage, 'dd/MM/yyyy', {
                timeZone: 'America/Sao_Paulo',
              }),
              time: format(message.dateMessage, 'HH:mm:ss', {
                timeZone: 'America/Sao_Paulo',
              }),
            },
          }
        })

        return msgs
      },
    )
  }
}
