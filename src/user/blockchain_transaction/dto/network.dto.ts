import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";

export class AddNetwork {
    @IsNotEmpty()
    @IsString()
    name : string

    @IsNotEmpty()
    @IsNumber()
    chainID : number

    @IsArray()
    @IsString({ each: true })
    rpc : string[]
}
