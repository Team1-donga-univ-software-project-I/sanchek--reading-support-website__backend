import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dtos/pagination.dto";
import { Discuss } from "../entities/discuss.entity";

@InputType()
export class AllDiscussesInput extends PaginationInput {}

@ObjectType()
export class AllDiscussesOutput extends PaginationOutput {
  @Field((type) => [Discuss], { nullable: true })
  results?: Discuss[];
}
