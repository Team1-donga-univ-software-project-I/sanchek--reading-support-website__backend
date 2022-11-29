import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Like, Raw, Repository } from "typeorm";
import {
  CreateSanchekInput,
  CreateSanchekOutput,
} from "./dtos/create-sanchek.dto";
import { EditSanchekInput, EditSanchekOutput } from "./dtos/edit-sanchek.dto";
import { Sanchek } from "./entities/sanchek.entity";
import {
  DeleteSanchekInput,
  DeleteSanchekOutput,
} from "./dtos/delete-sanchek.dto";
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
    private readonly sancheks: Repository<Sanchek>
  ) {}

  async createSanchek(
    author: User,
    createSanchekInput: CreateSanchekInput
  ): Promise<CreateSanchekOutput> {
    try {
      const newSanchek = this.sancheks.create(createSanchekInput);
      newSanchek.author = author;
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

      await this.sancheks.save([
        {
          id: editSanchekInput.sanchekId,
          ...editSanchekInput,
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

  async allSancheks({ page }: AllSancheksInput): Promise<AllSancheksOutput> {
    try {
      const [sancheks, totalResults] = await this.sancheks.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
        relations: ["author"],
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
      const sanchek = await this.sancheks.findOne({ where: { id: sanchekId }, relations: ["author"] });
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
        relations: ["author"],
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
