import { IsString, IsNotEmpty } from 'class-validator';

export class CreateHobbyDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  description?: string;
}
