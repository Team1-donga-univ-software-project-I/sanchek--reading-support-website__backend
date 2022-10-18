import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Discuss } from "../entities/discuss.entity";

@InputType()
export class DiscussInput {
  @Field((type) => Number)
  discussId: number;
}

@ObjectType()
export class DiscussOutput extends CoreOutput {
  @Field((type) => Discuss, { nullable: true })
  discuss?: Discuss;
}
