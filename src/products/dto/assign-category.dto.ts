import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class AssignCategoryDto {
    @ApiProperty()
    productIds: string[]
    @ApiProperty()
    @IsUUID()
    categoryId: string
}