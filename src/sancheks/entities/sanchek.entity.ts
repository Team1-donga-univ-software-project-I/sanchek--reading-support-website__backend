import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BookInfo } from "./book-info.entity";

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

  @Field((type) => User, { nullable: true })
  @ManyToOne((type) => User, (user) => user.sancheks, { onDelete: "SET NULL" })
  author: User;

  @Field((type) => BookInfo)
  @OneToOne((type) => BookInfo, (bookInfo) => bookInfo.sanchek, {
    onDelete: "CASCADE",
  })
  bookInfo: BookInfo;
}
