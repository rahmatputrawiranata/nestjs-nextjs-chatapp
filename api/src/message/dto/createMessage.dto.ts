import { Prop } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class ContentDTO {
    @IsString()
    @IsNotEmpty()
    content: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(['text', 'image'])
    type: string;
}

export class CreateMessageDTO {
    @IsOptional()
    messageId?: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => ContentDTO)
    content: ContentDTO;

    @ArrayNotEmpty()
    @IsArray()
    @IsString({ each: true })
    recepientIds?: string[];
}