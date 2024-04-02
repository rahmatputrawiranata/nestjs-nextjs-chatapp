import { Body, Controller, Get, HttpStatus, Post, Query, Request } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { HttpResponseInterface } from 'src/@interceptors/http-transformer.interceptor';
import { MessageDTO } from './dto/message.dto';
import { ViewMessageDTO } from './dto/viewMessage.dto';

@Controller('')
export class MessageController {

    constructor(
        private readonly messageService: MessageService
    ) {}

    @Get('getMessages')
    async getMessages(@Request() req): Promise<HttpResponseInterface<MessageDTO[]>> {
        
        const messageDocuments = await this.messageService.getMessagesByUserId(req.user.id);
        
        return {
            status: true,
            statusCode: HttpStatus.OK,
            response: messageDocuments
        }
    }

    @Get('viewMessage')
    async viewMessage(@Request() req, @Query() query: ViewMessageDTO): Promise<HttpResponseInterface<MessageDTO>> {

        const messageDocument = await this.messageService.viewMessageByIdAndUserId(query.messageId, req.user.id);
        return {
            status: true,
            statusCode: HttpStatus.OK,
            response: messageDocument
        }
    }

    @Post('sendMessage')
    async sendMessage(@Request() req, @Body() message: CreateMessageDTO): Promise<HttpResponseInterface<MessageDTO>> {
        const messageDocument = await this.messageService.sendMessage(req.user.id, {
            messageId: message.messageId,
            content: message.content,
            recepientIds: message.recepientIds
        })

        return {
            status: true,
            statusCode: HttpStatus.CREATED,
            response: messageDocument
        };
    }

}
