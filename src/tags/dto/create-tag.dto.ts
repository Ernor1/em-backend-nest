import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateTagDto {
    @IsNotEmpty()
    @ApiProperty()
    content: string
}
