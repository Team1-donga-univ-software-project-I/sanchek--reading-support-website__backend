import { InputType, OmitType } from "@nestjs/graphql";
import { Sanchek } from "../entities/sanchek.entity";

@InputType()
export class CreateSanchekDto extends OmitType(Sanchek, ["id"]) {}
