import { Field, InputType, ObjectType, PartialType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { CreateDiscussInput } from "./create-discuss.dto";

@InputType()
export class EditDiscussInput extends PartialType(CreateDiscussInput) {
  @Field((type) => Number)
  discussId: number;
}

@ObjectType()
export class EditDiscussOutput extends CoreOutput {}
