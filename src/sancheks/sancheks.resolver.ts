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
import { AllBooksOutput } from "./dtos/all-books.dto";
import { AllSancheksInput, AllSancheksOutput } from "./dtos/all-sancheks.dto";
import { BookSearchInput, BookSearchOutput } from "./dtos/book-search.dto";
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
  PlusLikedCountInput,
  PlusLikedCountOutput,
} from "./dtos/plus-likedCount.dto";
import { SanchekInput, SanchekOutput } from "./dtos/sanchek.dto";
import {
  SearchSancheksInput,
  SearchSancheksOutput,
} from "./dtos/search-sanchek.dto";
import { BookName } from "./entities/book-name.entity";
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

  @Mutation((returns) => PlusLikedCountOutput)
  plusLikedCount(
    @Args("input") plusLikedCountInput: PlusLikedCountInput
  ): Promise<PlusLikedCountOutput> {
    return this.sanchekService.plusLikedCount(plusLikedCountInput);
  }
}

@Resolver((of) => BookName)
export class BookNameResolver {
  constructor(private readonly sanchekService: SanchekService) {}

  @ResolveField((type) => Number)
  sanchekCount(@Parent() bookName: BookName): Promise<number> {
    return this.sanchekService.countSanchekBookName(bookName);
  }

  @Query((type) => AllBooksOutput)
  allBooks(): Promise<AllBooksOutput> {
    return this.sanchekService.allBooks();
  }

  @Query((type) => BookSearchOutput)
  bookSearch(
    @Args("input") bookSearchInput: BookSearchInput
  ): Promise<BookSearchOutput> {
    return this.sanchekService.bookSearch(bookSearchInput);
  }
}
