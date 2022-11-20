import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Archivements } from "../entities/archivement.entity";

@ObjectType()
export class UserArchivementsOutput extends CoreOutput {
  @Field((type) => Archivements, { nullable: true })
  archivements?: Archivements;
}
