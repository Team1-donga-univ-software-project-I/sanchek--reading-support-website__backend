import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import {
  CreateSanchekInput,
  CreateSanchekOutput,
} from "./dtos/create-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";

@Injectable()
export class SanchekService {
  constructor(
    @InjectRepository(Sanchek)
    private readonly sancheks: Repository<Sanchek>
  ) {}

  async createSanchek(
    author: User,
    createSanchekInput: CreateSanchekInput
  ): Promise<CreateSanchekOutput> {
    try {
      const newRestaurant = this.sancheks.create(createSanchekInput);
      await this.sancheks.save(newRestaurant);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: "Could not create restaurant",
      };
    }
  }
}
