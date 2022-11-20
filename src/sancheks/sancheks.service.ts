import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Like, Raw, Repository } from "typeorm";
import {
  CreateSanchekInput,
  CreateSanchekOutput,
} from "./dtos/create-sanchek.dto";
import { BookName } from "./entities/book-name.entity";
import { EditSanchekInput, EditSanchekOutput } from "./dtos/edit-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";
import {
  DeleteSanchekInput,
  DeleteSanchekOutput,
} from "./dtos/delete-sanchek.dto";
import { AllBooksOutput } from "./dtos/all-books.dto";
import { BookSearchInput, BookSearchOutput } from "./dtos/book-search.dto";
import { AllSancheksInput, AllSancheksOutput } from "./dtos/all-sancheks.dto";
import { SanchekInput, SanchekOutput } from "./dtos/sanchek.dto";
import {
  SearchSancheksInput,
  SearchSancheksOutput,
} from "./dtos/search-sanchek.dto";
import {
  PlusLikedCountInput,
  PlusLikedCountOutput,
} from "./dtos/plus-likedCount.dto";
import {
  FindSanchekByUserInput,
  FindSanchekByUserOutput,
} from "./dtos/find-sancheks-user.dto";

@Injectable()
export class SanchekService {
  constructor(
    @InjectRepository(Sanchek)
    private readonly sancheks: Repository<Sanchek>,
    @InjectRepository(BookName)
    private readonly bookNames: Repository<BookName>
  ) {}

  async getOrCreate(title: string): Promise<BookName> {
    const bookTitle = title.trim().toLowerCase().replace(/ +/g, " ");
    const bookNameSlug = bookTitle.replace(/ /g, "-");
    let bookName = await this.bookNames.findOne({
      where: { slug: bookNameSlug },
    });
    if (!bookName) {
      bookName = await this.bookNames.save(
        this.bookNames.create({ slug: bookNameSlug, title: bookTitle })
      );
    }
    return bookName;
  }

  async createSanchek(
    author: User,
    createSanchekInput: CreateSanchekInput
  ): Promise<CreateSanchekOutput> {
    try {
      const newSanchek = this.sancheks.create(createSanchekInput);
      newSanchek.author = author;
      const bookName = await this.getOrCreate(
        createSanchekInput.bookNameString
      );
      console.log(bookName);
      newSanchek.bookName = bookName;
      await this.sancheks.save(newSanchek);
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

  async editSanchek(
    author: User,
    editSanchekInput: EditSanchekInput
  ): Promise<EditSanchekOutput> {
    try {
      const sanchek = await this.sancheks.findOne({
        where: { id: editSanchekInput.sanchekId },
      });
      if (!sanchek) {
        return {
          ok: false,
          error: "Sanchek Not Found",
        };
      }
      if (author.id !== sanchek.authorId) {
        return {
          ok: false,
          error: "You can't access others sanchek",
        };
      }
      let bookName: BookName = null;
      if (editSanchekInput.bookNameString) {
        bookName = await this.getOrCreate(editSanchekInput.bookNameString);
      }
      await this.sancheks.save([
        {
          id: editSanchekInput.sanchekId,
          ...editSanchekInput,
          ...(bookName && { bookName }),
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async deleteSanchek(
    author: User,
    { sanchekId }: DeleteSanchekInput
  ): Promise<DeleteSanchekOutput> {
    try {
      const sanchek = await this.sancheks.findOne({ where: { id: sanchekId } });
      if (!sanchek) {
        return {
          ok: false,
          error: "Sanchek not found",
        };
      }
      if (author.id !== sanchek.authorId) {
        return {
          ok: false,
          error: "You can't access others sanchek",
        };
      }
      await this.sancheks.delete(sanchekId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async allBooks(): Promise<AllBooksOutput> {
    try {
      const bookNames = await this.bookNames.find();
      return {
        ok: true,
        bookNames,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  countSanchekBookName(bookName: BookName) {
    return this.sancheks.count({ where: { bookName: { id: bookName.id } } });
  }

  async bookSearch({ slug, page }: BookSearchInput): Promise<BookSearchOutput> {
    try {
      const bookName = await this.bookNames.findOne({
        where: { slug },
      });
      if (!bookName) {
        return {
          ok: false,
          error: "Book not found",
        };
      }
      const sancheks = await this.sancheks.find({
        where: {
          bookName: { id: bookName.id },
        },
        take: 25,
        skip: (page - 1) * 25,
      });
      const totalResults = await this.countSanchekBookName(bookName);
      return {
        ok: true,
        sancheks,
        bookName,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async allSancheks({ page }: AllSancheksInput): Promise<AllSancheksOutput> {
    try {
      const [sancheks, totalResults] = await this.sancheks.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        results: sancheks,
        totalPages: Math.ceil(totalResults / 25),
        totalResults,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findSanchekById({ sanchekId }: SanchekInput): Promise<SanchekOutput> {
    try {
      const sanchek = await this.sancheks.findOne({ where: { id: sanchekId } });
      if (!sanchek) {
        return {
          ok: false,
          error: "Sanchek not found",
        };
      }
      return {
        ok: true,
        sanchek,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findSanchekByUser(
    authUser: User,
    { page }: FindSanchekByUserInput
  ): Promise<FindSanchekByUserOutput> {
    try {
      const [sancheks, totalResults] = await this.sancheks.findAndCount({
        where: {
          author: { id: authUser.id },
        },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        sancheks,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {}
  }

  async searchSanchekByQuery({
    page,
    query,
  }: SearchSancheksInput): Promise<SearchSancheksOutput> {
    try {
      const [sancheks, totalResults] = await this.sancheks.findAndCount({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
        },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        sancheks,
        totalResults,
        totalPages: Math.ceil(totalResults / 25),
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async plusLikedCount({
    sanchekId,
  }: PlusLikedCountInput): Promise<PlusLikedCountOutput> {
    try {
      const sanchek = await this.sancheks.findOne({ where: { id: sanchekId } });
      if (!sanchek) {
        return {
          ok: false,
          error: "Sanchek not found",
        };
      }
      await this.sancheks.save([
        {
          id: sanchekId,
          likedCount: sanchek.likedCount + 1,
        },
      ]);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
