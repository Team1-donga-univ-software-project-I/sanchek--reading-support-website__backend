import { InternalServerErrorException } from "@nestjs/common";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import * as bcrypt from "bcrypt";
import { CoreEntity } from "src/common/entities/core.entity";
import { IsEmail, IsString } from "class-validator";

@InputType({ isAbstract: true })
@ObjectType()
@Entity()
export class User extends CoreEntity {
  @Column()
  @Field((type) => String)
  @IsEmail()
  email: string;

  @Column({ select: false })
  @Field((type) => String)
  password: string;

  @Column()
  @Field((type) => String)
  @IsString()
  nickname: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(undefinedPassword: string): Promise<boolean> {
    if (this.password) {
      try {
        const ok = await bcrypt.compare(undefinedPassword, this.password);
        return ok;
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }
}
