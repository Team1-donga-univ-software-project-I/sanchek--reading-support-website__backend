import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { BookName } from "../entities/book-name.entity";

@ObjectType()
export class AllBooksOutput extends CoreOutput {
  @Field((type) => [BookName], { nullable: true })
  bookNames?: BookName[];
}
