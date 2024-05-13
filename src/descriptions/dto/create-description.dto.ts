import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateDescriptionDto {
    @ApiProperty()
    @IsNotEmpty()
    content: string
    @ApiProperty()
    @IsUUID()
    productId: string
}
