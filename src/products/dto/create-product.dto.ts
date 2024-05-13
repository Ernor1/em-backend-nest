import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { Availability } from "@prisma/client"
import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateProductDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string
    @IsNotEmpty()
    @ApiProperty()
    @IsNumber()
    price: number
    @ApiProperty({ type: 'boolean' })
    sale?: boolean
    @IsNotEmpty()
    @ApiProperty({
        enum: Availability,
        isArray: false,
        example: [Availability.AVAILABLE, Availability.NOT_AVAILABLE]

    })
    availability: Availability
}
