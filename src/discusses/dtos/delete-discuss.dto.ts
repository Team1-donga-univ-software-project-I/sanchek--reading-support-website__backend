import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteDiscussInput {
  @Field((type) => Number)
  discussId: number;
}

@ObjectType()
export class DeleteDiscussOutput extends CoreOutput {}
