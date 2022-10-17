import { Field, InputType, ObjectType } from "@nestjs/graphql";
import {
  PaginationInput,
  PaginationOutput,
} from "src/common/dtos/pagination.dto";
import { BookName } from "../entities/book-name.entity";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class BookSearchInput extends PaginationInput {
  @Field((type) => String)
  slug: string;
}

@ObjectType()
export class BookSearchOutput extends PaginationOutput {
  @Field((type) => BookName, { nullable: true })
  bookName?: BookName;

  @Field((type) => [Sanchek], { nullable: true })
  sancheks?: Sanchek[];
}
