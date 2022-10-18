import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Opinion } from "../entities/opinion.entity";

@InputType()
export class FindOpinionsInput {
  @Field((type) => Number)
  discussId: number;
}

@ObjectType()
export class FindOpinionsOutput extends CoreOutput {
  @Field((type) => [Opinion], { nullable: true })
  results?: Opinion[];
}
