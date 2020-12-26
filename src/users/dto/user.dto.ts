import { IsString, MinLength, MaxLength, IsBoolean } from 'class-validator';

export class UserDTO {
  @IsString()
  userId: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsBoolean()
  approved: boolean;
}
