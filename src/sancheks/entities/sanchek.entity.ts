import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsNumber, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";

@InputType("SanchekInputType", { isAbstract: true })
@ObjectType()
@Entity({ orderBy: { createdAt: "DESC" }})
export class Sanchek extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 120)
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(1, 1200)
  content: string;

  @Field((type) => Boolean)
  @Column()
  @IsBoolean()
  isOpend: boolean;

  @Field((type) => Number, { defaultValue: 0 })
  @Column({ default: 0 })
  @IsNumber()
  likedCount: number;

  @Field((type) => String, { nullable: true })
  @Column()
  @IsString()
  bookName: string;

  @Field((type) => User)
  @ManyToOne((type) => User, (user) => user.sancheks, { onDelete: "CASCADE" })
  author: User;

  @RelationId((sanchek: Sanchek) => sanchek.author)
  authorId: number;
}
