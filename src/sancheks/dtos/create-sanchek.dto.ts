import { InputType, ObjectType, OmitType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class CreateSanchekInput extends OmitType(Sanchek, [
  "id",
  "bookInfo",
  "author",
]) {}

@ObjectType()
export class CreateSanchekOutput extends CoreOutput {}
