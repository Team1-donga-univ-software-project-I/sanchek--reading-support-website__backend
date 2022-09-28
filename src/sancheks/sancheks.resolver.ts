import { Args, Query, Resolver, Mutation } from "@nestjs/graphql";
import { CreateSanchekDto } from "./dtos/create-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";

@Resolver((of) => Sanchek)
export class SanchekResolver {
  @Query((returns) => [Sanchek])
  sancheks(@Args("isOk") isOk: boolean): Sanchek[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createSanchek(@Args() createSanchekDto: CreateSanchekDto): boolean {
    return true;
  }
}
