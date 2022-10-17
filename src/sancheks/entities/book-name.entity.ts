import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Sanchek } from "./sanchek.entity";

@InputType("BookInfoInputType", { isAbstract: true })
@ObjectType()
@Entity()
export class BookName extends CoreEntity {
  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  title: string;

  @Field((type) => String)
  @Column({ unique: true })
  @IsString()
  slug: string;

  @Field((type) => [Sanchek], { nullable: true })
  @OneToMany((type) => Sanchek, (sanchek) => sanchek.bookName)
  sanchek: Sanchek[];
}
