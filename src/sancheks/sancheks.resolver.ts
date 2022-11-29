import { UseGuards } from "@nestjs/common";
import {
  Args,
  Resolver,
  Mutation,
  ResolveField,
  Query,
  Parent,
} from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/users/entities/user.entity";
import { AllSancheksInput, AllSancheksOutput } from "./dtos/all-sancheks.dto";
import {
  CreateSanchekInput,
  CreateSanchekOutput,
} from "./dtos/create-sanchek.dto";
import {
  DeleteSanchekInput,
  DeleteSanchekOutput,
} from "./dtos/delete-sanchek.dto";
import { EditSanchekInput, EditSanchekOutput } from "./dtos/edit-sanchek.dto";
import {
  FindSanchekByUserInput,
  FindSanchekByUserOutput,
} from "./dtos/find-sancheks-user.dto";
import {
  PlusLikedCountInput,
  PlusLikedCountOutput,
} from "./dtos/plus-likedCount.dto";
import { SanchekInput, SanchekOutput } from "./dtos/sanchek.dto";
import {
  SearchSancheksInput,
  SearchSancheksOutput,
} from "./dtos/search-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";
import { SanchekService } from "./sancheks.service";

@Resolver((of) => Sanchek)
export class SanchekResolver {
  constructor(private readonly sanchekService: SanchekService) {}

  @Mutation((returns) => CreateSanchekOutput)
  @UseGuards(AuthGuard)
  createSanchek(
    @AuthUser() authUser: User,
    @Args("input") createSanchekInput: CreateSanchekInput
  ): Promise<CreateSanchekOutput> {
    return this.sanchekService.createSanchek(authUser, createSanchekInput);
  }

  @Mutation((returns) => EditSanchekOutput)
  @UseGuards(AuthGuard)
  editSanchek(
    @AuthUser() authUser: User,
    @Args("input") editSanchekInput: EditSanchekInput
  ): Promise<EditSanchekOutput> {
    return this.sanchekService.editSanchek(authUser, editSanchekInput);
  }

  @Mutation((returns) => DeleteSanchekOutput)
  @UseGuards(AuthGuard)
  deleteSanchek(
    @AuthUser() author: User,
    @Args("input") deleteSanchekInput: DeleteSanchekInput
  ): Promise<DeleteSanchekOutput> {
    return this.sanchekService.deleteSanchek(author, deleteSanchekInput);
  }

  @Query((returns) => AllSancheksOutput)
  allSancheks(
    @Args("input") allSancheksInput: AllSancheksInput
  ): Promise<AllSancheksOutput> {
    return this.sanchekService.allSancheks(allSancheksInput);
  }

  @Query((returns) => SanchekOutput)
  findSanchekById(
    @Args("input") sanchekInput: SanchekInput
  ): Promise<SanchekOutput> {
    return this.sanchekService.findSanchekById(sanchekInput);
  }

  @Query((returns) => SearchSancheksOutput)
  searchSanchekByQuery(
    @Args("input") searchSancheksInput: SearchSancheksInput
  ): Promise<SearchSancheksOutput> {
    return this.sanchekService.searchSanchekByQuery(searchSancheksInput);
  }

  @Query((returns) => FindSanchekByUserOutput)
  @UseGuards(AuthGuard)
  findSanchekByUser(
    @AuthUser() authUser: User,
    @Args("input") findSanchekByUserInput: FindSanchekByUserInput
  ): Promise<FindSanchekByUserOutput> {
    return this.sanchekService.findSanchekByUser(
      authUser,
      findSanchekByUserInput
    );
  }

  @Mutation((returns) => PlusLikedCountOutput)
  plusLikedCount(
    @Args("input") plusLikedCountInput: PlusLikedCountInput
  ): Promise<PlusLikedCountOutput> {
    return this.sanchekService.plusLikedCount(plusLikedCountInput);
  }
}
