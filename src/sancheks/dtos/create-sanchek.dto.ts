import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class CreateSanchekInput extends PickType(Sanchek, [
  "title",
  "content",
  "isOpend",
]) {
  @Field((type) => String)
  bookNameString: string;
}

@ObjectType()
export class CreateSanchekOutput extends CoreOutput {}
