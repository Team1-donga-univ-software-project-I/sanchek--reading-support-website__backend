import { Args, Query, Resolver, Mutation } from "@nestjs/graphql";
import { CreateSanchekDto } from "./dtos/create-sanchek.dto";
import { UpdateSanchekDto } from "./dtos/update-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";
import { SanchekService } from "./sancheks.service";

@Resolver((of) => Sanchek)
export class SanchekResolver {
  constructor(private readonly sanchekService: SanchekService) {}

  @Query((returns) => [Sanchek])
  sancheks(): Promise<Sanchek[]> {
    return this.sanchekService.getAll();
  }

  @Mutation((returns) => Boolean)
  async createSanchek(
    @Args("input") createSanchekDto: CreateSanchekDto
  ): Promise<Boolean> {
    try {
      await this.sanchekService.createSanchek(createSanchekDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation((returns) => Boolean)
  async updateSanchek(
    @Args("input") updateSanchekDto: UpdateSanchekDto
  ): Promise<Boolean> {
    try {
      await this.sanchekService.updateSanchek(updateSanchekDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
