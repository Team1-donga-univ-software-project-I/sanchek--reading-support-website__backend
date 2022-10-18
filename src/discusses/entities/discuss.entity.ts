import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";
import { Opinion } from "./opinion.entity";

@InputType("DiscussInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Discuss extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 30)
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 1000)
  content: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.sancheks, { onDelete: "CASCADE" })
  author: User;

  @RelationId((discuss: Discuss) => discuss.author)
  authorId: number;

  @Field((type) => [Opinion])
  @OneToMany((type) => Opinion, (opinion) => opinion.discuss)
  opinions: Opinion[];
}
