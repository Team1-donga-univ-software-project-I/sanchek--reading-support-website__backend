import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query((returns) => Boolean)
  users() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  createAccount(@Args("input") createAccountInput: CreateAccountInput) {}
}
