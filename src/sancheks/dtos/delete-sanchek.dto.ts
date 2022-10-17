import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteSanchekInput {
  @Field((type) => Number)
  sanchekId: number;
}

@ObjectType()
export class DeleteSanchekOutput extends CoreOutput {}
