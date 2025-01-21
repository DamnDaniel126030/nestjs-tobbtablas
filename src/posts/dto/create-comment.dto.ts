import { IsEmail, IsString } from "class-validator";

export class CreateCommentDto {
  @IsEmail()
  email: string;

  @IsString()
  content: string
}
