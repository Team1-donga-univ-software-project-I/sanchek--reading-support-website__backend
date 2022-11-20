import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { UserArchivementsOutput } from "./dtos/user-archivements.dto";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { Archivements } from "./entities/archivement.entity";
import { User } from "./entities/user.entity";
import { UserService } from "./users.service";

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args("input") createAccountInput: CreateAccountInput
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Mutation((returns) => LoginOutput)
  async login(@Args("input") loginInput: LoginInput): Promise<LoginOutput> {
    return this.userService.login(loginInput);
  }

  @Query((returns) => User)
  @UseGuards(AuthGuard)
  me(@AuthUser() authUser: User) {
    return authUser;
  }

  @UseGuards(AuthGuard)
  @Query((returns) => UserProfileOutput)
  async userProfile(
    @Args("input") userProfileInput: UserProfileInput
  ): Promise<UserProfileOutput> {
    return this.userService.userProfile(userProfileInput.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation((returns) => EditProfileOutput)
  async editProfile(
    @AuthUser() authUser: User,
    @Args("input") editProfileInput: EditProfileInput
  ): Promise<EditProfileOutput> {
    return this.userService.editProfile(authUser.id, editProfileInput);
  }
}

@Resolver((of) => Archivements)
export class ArchivementResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query((returns) => UserArchivementsOutput)
  async userArchivements(
    @AuthUser() authUser: User
  ): Promise<UserProfileOutput> {
    return this.userService.userArchivements(authUser);
  }
}
