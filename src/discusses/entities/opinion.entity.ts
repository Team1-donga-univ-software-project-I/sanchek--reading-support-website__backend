import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { Discuss } from "./discuss.entity";

@InputType("OpinionInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Opinion extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 200)
  content: string;

  @Field((type) => Discuss)
  @ManyToOne((type) => Discuss, (discuss) => discuss.opinions, {
    onDelete: "CASCADE",
  })
  discuss: Discuss;

  @RelationId((opinion: Opinion) => opinion.discuss)
  discussId: number;
}
