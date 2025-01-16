import { Injectable } from '@nestjs/common'
import { PrismaService } from 'nestjs-prisma'
import { PrismaUtil } from 'src/utils/prisma.util'
import { UpdateBlogMessageDto } from './dto/update-blog-message.dto'
import { CreateBlogMessageDto } from './dto/create-blog-message.dto'
import { BlogMessageDate } from 'src/interfaces/blog.interface'
import { format } from 'date-fns-tz'
import { formatDateTimeSaoPaulo } from 'src/utils/date.util'

@Injectable()
export class BlogService {
  constructor(
    private prisma: PrismaService,
    private prismaUtil: PrismaUtil,
  ) {}

  async create(createBlogMessageDto: CreateBlogMessageDto, idUser: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível cadastrar a mensagem',
      async () => {
        const data = await this.prisma.blogMessages.create({
          data: {
            ...createBlogMessageDto,
            idUser: idUser,
          },
        })

        data.dateMessage = formatDateTimeSaoPaulo(data.dateMessage)

        return data
      },
    )
  }

  async findAll(idUser?: number): Promise<BlogMessageDate[]> {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar pelas mensagens',
      async () => {
        const data = await this.prisma.blogMessages.findMany({
          where: idUser ? { idUser: idUser } : {},
        })

        const blogMsgs: BlogMessageDate[] = data.map((message) => {
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

        return blogMsgs
      },
    )
  }

  async findOne(idUser: number, idMessage: number): Promise<BlogMessageDate> {
    return this.prismaUtil.performOperation(
      'Não foi possível buscar a mensagem',
      async () => {
        const data = await this.prisma.blogMessages.findUnique({
          where: { idMessage: idMessage, idUser: idUser },
        })

        const blogMsg = {
          ...data,
          dateMessage: formatDateTimeSaoPaulo(data.dateMessage),
          formatDate: {
            date: format(data.dateMessage, 'dd/MM/yyyy', {
              timeZone: 'America/Sao_Paulo',
            }),
            time: format(data.dateMessage, 'HH:mm:ss', {
              timeZone: 'America/Sao_Paulo',
            }),
          },
        }

        return blogMsg
      },
    )
  }

  async update(
    idMessage: number,
    idUser: number,
    updateBlogMessageDto: UpdateBlogMessageDto,
  ) {
    return this.prismaUtil.performOperation(
      'Não foi porrível atualizar a mensagem',
      async () => {
        const data = await this.prisma.blogMessages.update({
          where: { idMessage: idMessage, idUser: idUser },
          data: updateBlogMessageDto,
        })

        data.dateMessage = formatDateTimeSaoPaulo(data.dateMessage)

        return data
      },
    )
  }

  async delete(idMessage: number, idUser: number) {
    return this.prismaUtil.performOperation(
      'Não foi possível deletar a mensagem',
      async () => {
        return this.prisma.blogMessages.delete({
          where: { idMessage: idMessage, idUser: idUser },
        })
      },
    )
  }
}
