import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dtos/pagination.dto";
import { Discuss } from "../entities/discuss.entity";

@InputType()
export class SearchDiscussesInput extends PaginationInput {
  @Field((type) => String)
  query: String;
}

@ObjectType()
export class SearchDiscussesOutput extends PaginationOutput {
  @Field((type) => [Discuss], { nullable: true })
  discusses?: Discuss[];
}
