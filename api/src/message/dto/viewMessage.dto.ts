import { IsNotEmpty, IsString } from "class-validator";

export class ViewMessageDTO {
    @IsNotEmpty()
    @IsString()
    messageId: string;
}