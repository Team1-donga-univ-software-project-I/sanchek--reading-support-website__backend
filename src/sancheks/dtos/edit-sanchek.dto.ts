import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { CreateSanchekInput } from "./create-sanchek.dto";

@InputType()
export class EditSanchekInput extends PartialType(CreateSanchekInput) {
  @Field((type) => Number)
  sanchekId: number;
}

@ObjectType()
export class EditSanchekOutput extends CoreOutput {}
