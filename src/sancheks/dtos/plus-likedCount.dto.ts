import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class PlusLikedCountInput {
  @Field((type) => Number)
  sanchekId: number;
}

@ObjectType()
export class PlusLikedCountOutput extends CoreOutput {}
