import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUUID, isUUID } from "class-validator"

export class CreateReviewDto {
    @IsNotEmpty()
    @ApiProperty()
    title: string
    @IsNotEmpty()
    @ApiProperty()
    content: string
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    rating: number
    @IsUUID()
    @ApiProperty()
    productId: string
}
