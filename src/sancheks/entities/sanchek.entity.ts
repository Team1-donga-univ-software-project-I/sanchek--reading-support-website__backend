import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Sanchek {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  id: number;

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

  @Field((type) => String)
  @Column()
  @IsString()
  author: string;
}
