import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateHobbyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;
}
