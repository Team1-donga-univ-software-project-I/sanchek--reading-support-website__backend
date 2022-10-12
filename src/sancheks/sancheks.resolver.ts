import { Args, Resolver, Mutation } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { CreateAccountOutput } from "src/users/dtos/create-account.dto";
import { User } from "src/users/entities/user.entity";
import { CreateSanchekInput } from "./dtos/create-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";
import { SanchekService } from "./sancheks.service";

@Resolver((of) => Sanchek)
export class SanchekResolver {
  constructor(private readonly sanchekService: SanchekService) {}

  @Mutation((returns) => CreateAccountOutput)
  async createSanchek(
    @AuthUser() authUser: User,
    @Args("input") createSanchekInput: CreateSanchekInput
  ): Promise<CreateAccountOutput> {
    return this.sanchekService.createSanchek(authUser, createSanchekInput);
  }
}
