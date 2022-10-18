import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Opinion } from "../entities/opinion.entity";

@InputType()
export class CreateOpinionInput extends PickType(Opinion, ["content"]) {
  @Field((type) => Number)
  discussId: number;
}

@ObjectType()
export class CreateOpinionOutput extends CoreOutput {}
