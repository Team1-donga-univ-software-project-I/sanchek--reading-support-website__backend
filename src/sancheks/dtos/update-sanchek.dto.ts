import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateSanchekDto } from "./create-sanchek.dto";

@InputType()
class UpdateSanchekInputType extends PartialType(CreateSanchekDto) {}

@InputType()
export class UpdateSanchekDto {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateSanchekInputType)
  data: UpdateSanchekInputType;
}
