import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dtos/pagination.dto";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class SearchSancheksInput extends PaginationInput {
  @Field((type) => String)
  query: String;
}

@ObjectType()
export class SearchSancheksOutput extends PaginationOutput {
  @Field((type) => [Sanchek], { nullable: true })
  sancheks?: Sanchek[];
}
