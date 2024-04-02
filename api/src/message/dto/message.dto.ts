export class MessageDTO {
    id: string;
    type: string;
    participants: {
        userId: string;
    }[];
    contents: {
        content: string;
        type: string;
        senderId: string;
        createdAt: Date;
    }[];
}