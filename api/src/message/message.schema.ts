import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/user.schema";

export class MessageParticipant {

    @Prop({required: true, type: Types.ObjectId, ref: User.name})
    userId: Types.ObjectId;
}

export class MessageContent {
    @Prop({ required: true})
    content: string;

    @Prop({required: true})
    type: string;

    @Prop({required: true, type: Types.ObjectId, ref: User.name})
    senderId: Types.ObjectId;

    @Prop({required: true})
    createdAt: Date;
}

@Schema()
export class Message {
    @Prop({ required: true })
    type: string;

    @Prop({ required: true, type: [MessageParticipant]})
    participants: MessageParticipant[];

    @Prop({ required: true, type: [MessageContent]})
    contents: MessageContent[];
    
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);