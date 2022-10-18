import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Discuss } from "../entities/discuss.entity";

@InputType()
export class CreateDiscussInput extends PickType(Discuss, [
  "title",
  "content",
]) {}

@ObjectType()
export class CreateDiscussOutput extends CoreOutput {}
