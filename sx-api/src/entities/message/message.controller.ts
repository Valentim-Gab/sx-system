import { Controller, Get, Post, Body } from '@nestjs/common'
import { ValidationPipe } from 'src/pipes/validation.pipe'
import { CreateMessageDto } from './dto/create-message.dto'
import { MessageService } from './message.service'

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body(new ValidationPipe()) createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto)
  }

  @Get()
  findAll() {
    return this.messageService.findAll()
  }
}
