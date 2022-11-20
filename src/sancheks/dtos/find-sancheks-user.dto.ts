import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dtos/pagination.dto";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class FindSanchekByUserInput extends PaginationInput {}

@ObjectType()
export class FindSanchekByUserOutput extends PaginationOutput {
  @Field((type) => [Sanchek], { nullable: true })
  sancheks?: Sanchek[];
}
