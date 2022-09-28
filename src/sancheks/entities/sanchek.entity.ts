import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Sanchek {
  @Field((type) => String)
  title: string;

  @Field((type) => String)
  content: string;

  @Field((type) => Boolean)
  isOpend: boolean;

  @Field((type) => String)
  author: string;
}
