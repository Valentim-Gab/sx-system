import {
  IsArray,
  IsDate,
  IsISO8601,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  lastName: string

  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsDate()
  @IsISO8601()
  dateBirth: Date

  @IsPhoneNumber()
  phoneNumber: string

  @IsArray()
  @IsNotEmpty()
  role: string[]
}
