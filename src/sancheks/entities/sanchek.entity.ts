import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BookName } from "./book-name.entity";

@InputType("SanchekInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class Sanchek extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 30)
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 200)
  content: string;

  @Field((type) => Boolean)
  @Column()
  @IsBoolean()
  isOpend: boolean;

  @Field((type) => BookName, { nullable: true })
  @ManyToOne((type) => BookName, (bookName) => bookName.sanchek, {
    nullable: true,
    onDelete: "SET NULL",
  })
  bookName: BookName;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.sancheks, { onDelete: "CASCADE" })
  author: User;

  @RelationId((sanchek: Sanchek) => sanchek.author)
  authorId: number;
}
