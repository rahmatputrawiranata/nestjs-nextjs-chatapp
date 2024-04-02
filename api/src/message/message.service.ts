import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message } from './message.schema';
import mongoose, { Document, Model, Types } from 'mongoose';
import { CreateMessageDTO } from './dto/createMessage.dto';
import { MessageDTO } from './dto/message.dto';

@Injectable()
export class MessageService {

    constructor(
        @InjectModel(Message.name) private messageModel: Model<Message>
    ) {}

    async getMessagesByUserId(userId: string): Promise<MessageDTO[]> {
        const messageDocuments = await this.messageModel.find({
            participants: {
                $elemMatch: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            }
        })

        return messageDocuments.map(messageDocument => ({
            id: messageDocument.id,
            type: messageDocument.type,
            participants: messageDocument.participants.map(participant => ({
                userId: participant.userId.toString()
            })),
            contents: messageDocument.contents.map(content => ({
                content: content.content,
                type: content.type,
                senderId: content.senderId.toString(),
                createdAt: content.createdAt
            }))
        }))
    }

    async sendMessage(senderId: string, message: CreateMessageDTO): Promise<MessageDTO> {
        
        const isRecepientsValid = message.recepientIds.every(recepientId => {
            return recepientId !== senderId
        })

        if(!isRecepientsValid) {
            throw new HttpException('Recepient cannot be the sender', 400)
        }

        let messageDocument: Document<unknown, {}, Message> & Message & {
            _id: Types.ObjectId;
        }

        if(!message.messageId) {
            const currentParticipants = [senderId, ...message.recepientIds];
            const existingMessageThatMatchesParticipants = await this.messageModel.findOne({
                participants: currentParticipants.map(userId => ({ userId: new mongoose.Types.ObjectId(userId) }))
            })
            if(!existingMessageThatMatchesParticipants) {
                messageDocument = await this.createNewMessage([senderId, ...message.recepientIds]);
            }else{
                messageDocument = existingMessageThatMatchesParticipants;
            }
            
        }else {
            const existingMessage = await this.messageModel.findById(message.messageId);
            if(!existingMessage) {
                throw new Error('Message not found')
            }

            messageDocument = existingMessage;
        }

        const contentData = {
            content: message.content.content,
            type: message.content.type,
            senderId: new mongoose.Types.ObjectId(senderId),
            createdAt: new Date(),
        }

        messageDocument.contents.push(contentData)

        await messageDocument.save();

        return {
            id: messageDocument.id,
            type: messageDocument.type,
            participants: messageDocument.participants.map(participant => ({
                userId: participant.userId.toString()
            })),
            contents: messageDocument.contents.map(content => ({
                content: content.content,
                type: content.type,
                senderId: content.senderId.toString(),
                createdAt: content.createdAt
            }))
        };
    }

    async viewMessageByIdAndUserId(messageId: string, userId: string): Promise<MessageDTO> {
        return this.messageModel.findOne({
            _id: new mongoose.Types.ObjectId(messageId),
            participants: {
                $elemMatch: {
                    userId: new mongoose.Types.ObjectId(userId)
                }
            }
        })
    }

    private async createNewMessage(participantIds: string[]) {
        const data = {
            type: participantIds.length > 2 ? 'group' : 'private',
            participants: participantIds.map(userId => ({ userId: new mongoose.Types.ObjectId(userId) }))
        }
        const create = await this.messageModel.create(data)
        return create
    }

}
