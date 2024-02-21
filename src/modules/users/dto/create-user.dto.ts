import { Transform } from "class-transformer";
import {IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { hashSync } from 'bcryptjs';
import { ApiProperty } from "@nestjs/swagger";


export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Transform(({value}: {value: string}) => hashSync(value, 10), {groups: ["transform"]})
  password: string;

  @ApiProperty()
  @IsString()
  telephone: string;

  registerDate: Date;
}
