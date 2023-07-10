import { IsNotEmpty, IsString } from "class-validator";

export class CreateClienteDto { 

    @IsString()
    @IsNotEmpty()
    nombre:string;

    @IsString()
    @IsNotEmpty()
    cedula:string;

    @IsString()
    @IsNotEmpty()
    edad:string;
}
