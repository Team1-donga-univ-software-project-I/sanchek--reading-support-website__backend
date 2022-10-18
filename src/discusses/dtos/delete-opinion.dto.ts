import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteOpinionInput {
  @Field((type) => Number)
  opinionId: number;
}

@ObjectType()
export class DeleteOpinionOutput extends CoreOutput {}
