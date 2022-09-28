import { ArgsType, Field } from "@nestjs/graphql";
import { Length, IsString, IsBoolean } from "class-validator";

@ArgsType()
export class CreateSanchekDto {
  @Field((type) => String)
  @IsString()
  @Length(1, 50)
  title: string;

  @Field((type) => String)
  @IsString()
  @Length(1, 200)
  content: string;

  @Field((type) => Boolean)
  @IsString()
  isOpend: boolean;

  @Field((type) => String)
  @IsBoolean()
  author: string;
}
