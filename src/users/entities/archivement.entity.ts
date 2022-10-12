import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class Archivements extends CoreEntity {
  @OneToOne((type) => User, { onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  archivement1: boolean;

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  archivement2: boolean;

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  archivement3: boolean;

  @Column({ default: false })
  @Field((type) => Boolean, { defaultValue: false })
  archivement4: boolean;
}
