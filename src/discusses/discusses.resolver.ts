import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { AuthGuard } from "src/auth/auth.guard";
import { User } from "src/users/entities/user.entity";
import { DiscussesService } from "./discusses.service";
import {
  AllDiscussesInput,
  AllDiscussesOutput,
} from "./dtos/all-discusses.dto";
import { FindOpinionsInput, FindOpinionsOutput } from "./dtos/all-opinions.dto";
import {
  CreateDiscussInput,
  CreateDiscussOutput,
} from "./dtos/create-discuss.dto";
import {
  CreateOpinionInput,
  CreateOpinionOutput,
} from "./dtos/create-opinion.dto";
import {
  DeleteDiscussInput,
  DeleteDiscussOutput,
} from "./dtos/delete-discuss.dto";
import {
  DeleteOpinionInput,
  DeleteOpinionOutput,
} from "./dtos/delete-opinion.dto";
import { DiscussInput, DiscussOutput } from "./dtos/discuss.dto";
import { EditDiscussInput, EditDiscussOutput } from "./dtos/edit-discuss.dto";
import {
  SearchDiscussesInput,
  SearchDiscussesOutput,
} from "./dtos/search-discusses.dto";
import { Discuss } from "./entities/discuss.entity";
import { Opinion } from "./entities/opinion.entity";

@Resolver((of) => Discuss)
export class DiscussesResolver {
  constructor(private readonly discussesService: DiscussesService) {}

  @Mutation((returns) => CreateDiscussOutput)
  @UseGuards(AuthGuard)
  async createDiscuss(
    @AuthUser() authUser: User,
    @Args("input") createDiscussInput: CreateDiscussInput
  ): Promise<CreateDiscussOutput> {
    return this.discussesService.createDiscuss(authUser, createDiscussInput);
  }

  @Mutation((returns) => EditDiscussOutput)
  @UseGuards(AuthGuard)
  editDiscuss(
    @AuthUser() authUser: User,
    @Args("input") editDiscussInput: EditDiscussInput
  ): Promise<EditDiscussOutput> {
    return this.discussesService.editDiscuss(authUser, editDiscussInput);
  }

  @Mutation((returns) => DeleteDiscussOutput)
  @UseGuards(AuthGuard)
  deleteDiscuss(
    @AuthUser() author: User,
    @Args("input") deleteDiscussInput: DeleteDiscussInput
  ): Promise<DeleteDiscussOutput> {
    return this.discussesService.deleteDiscuss(author, deleteDiscussInput);
  }

  @Query((returns) => AllDiscussesOutput)
  allDiscusses(
    @Args("input") allDiscussesInput: AllDiscussesInput
  ): Promise<AllDiscussesOutput> {
    return this.discussesService.allDiscusses(allDiscussesInput);
  }

  @Query((returns) => DiscussOutput)
  findDiscussById(
    @Args("input") discussInput: DiscussInput
  ): Promise<DiscussOutput> {
    return this.discussesService.findDiscussById(discussInput);
  }

  @Query((returns) => SearchDiscussesOutput)
  searchDiscussByQuery(
    @Args("input") searchDiscussesInput: SearchDiscussesInput
  ): Promise<SearchDiscussesOutput> {
    return this.discussesService.searchDiscussesByQuery(searchDiscussesInput);
  }
}

@Resolver((of) => Opinion)
export class OpinionsResolver {
  constructor(private readonly discussesService: DiscussesService) {}

  @Mutation((returns) => CreateOpinionOutput)
  @UseGuards(AuthGuard)
  commentOpinion(
    @Args("input") createOpinionInput: CreateOpinionInput
  ): Promise<CreateOpinionOutput> {
    return this.discussesService.commentOpinion(createOpinionInput);
  }

  @Mutation((returns) => DeleteOpinionOutput)
  @UseGuards(AuthGuard)
  deleteOpinion(
    @AuthUser() author: User,
    @Args("input") deleteOpinionInput: DeleteOpinionInput
  ): Promise<DeleteOpinionOutput> {
    return this.discussesService.deleteOpinion(author, deleteOpinionInput);
  }

  @Query((returns) => FindOpinionsOutput)
  findOpinions(
    @Args("input") findOpinionsInput: FindOpinionsInput
  ): Promise<FindOpinionsOutput> {
    return this.discussesService.findOpinions(findOpinionsInput);
  }
}
