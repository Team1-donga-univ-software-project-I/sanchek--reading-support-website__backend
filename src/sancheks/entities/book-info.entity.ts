import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Sanchek } from "./sanchek.entity";

@InputType("BookInfoInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class BookInfo extends CoreEntity {
  @Field((type) => String)
  @Column()
  @IsString()
  title: string;

  @Field((type) => String)
  @Column()
  @IsString()
  content: string;

  @Field((type) => [Sanchek])
  @OneToOne((type) => Sanchek, (sanchek) => sanchek.bookInfo, {
    onDelete: "SET NULL",
  })
  sanchek: Sanchek;
}
