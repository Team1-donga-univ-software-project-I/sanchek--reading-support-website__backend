import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class SanchekInput {
  @Field((type) => Number)
  sanchekId: number;
}

@ObjectType()
export class SanchekOutput extends CoreOutput {
  @Field((type) => Sanchek, { nullable: true })
  sanchek?: Sanchek;
}
