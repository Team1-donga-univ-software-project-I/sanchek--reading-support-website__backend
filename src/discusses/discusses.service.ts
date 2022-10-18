import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Raw, Repository } from "typeorm";
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

@Injectable()
export class DiscussesService {
  constructor(
    @InjectRepository(Discuss)
    private readonly discusses: Repository<Discuss>,
    @InjectRepository(Opinion)
    private readonly opinions: Repository<Opinion>
  ) {}

  async createDiscuss(
    author: User,
    createDiscussInput: CreateDiscussInput
  ): Promise<CreateDiscussOutput> {
    try {
      const newDiscuss = this.discusses.create(createDiscussInput);
      newDiscuss.author = author;
      await this.discusses.save(newDiscuss);
      return {
        ok: true,
      };
    } catch {
      return {
        ok: false,
        error: "Could not create discuss",
      };
    }
  }

  async editDiscuss(
    author: User,
    editDiscussInput: EditDiscussInput
  ): Promise<EditDiscussOutput> {
    try {
      const discuss = await this.discusses.findOne({
        where: { id: editDiscussInput.discussId },
      });
      if (!discuss) {
        return {
          ok: false,
          error: "Discuss Not Found",
        };
      }
      if (author.id !== discuss.authorId) {
        return {
          ok: false,
          error: "You can't access others' discuss",
        };
      }
      await this.discusses.save([
        {
          id: editDiscussInput.discussId,
          ...editDiscussInput,
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

  async deleteDiscuss(
    author: User,
    { discussId }: DeleteDiscussInput
  ): Promise<DeleteDiscussOutput> {
    try {
      const discuss = await this.discusses.findOne({
        where: { id: discussId },
      });
      if (!discuss) {
        return {
          ok: false,
          error: "Discuss not found",
        };
      }
      if (author.id !== discuss.authorId) {
        return {
          ok: false,
          error: "You can't access others' discuss",
        };
      }
      await this.discusses.delete(discussId);
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

  async allDiscusses({ page }: AllDiscussesInput): Promise<AllDiscussesOutput> {
    try {
      const [discusses, totalResults] = await this.discusses.findAndCount({
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        results: discusses,
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

  async findDiscussById({ discussId }: DiscussInput): Promise<DiscussOutput> {
    try {
      const discuss = await this.discusses.findOne({
        where: { id: discussId },
        relations: ["opinions"],
      });
      if (!discuss) {
        return {
          ok: false,
          error: "Discuss not found",
        };
      }
      return {
        ok: true,
        discuss,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async searchDiscussesByQuery({
    page,
    query,
  }: SearchDiscussesInput): Promise<SearchDiscussesOutput> {
    try {
      const [discusses, totalResults] = await this.discusses.findAndCount({
        where: {
          title: Raw((title) => `${title} ILIKE '%${query}%'`),
        },
        skip: (page - 1) * 25,
        take: 25,
      });
      return {
        ok: true,
        discusses,
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

  async commentOpinion(
    createOpinionInput: CreateOpinionInput
  ): Promise<CreateOpinionOutput> {
    try {
      const discuss = await this.discusses.findOne({
        where: { id: createOpinionInput.discussId },
      });
      if (!discuss) {
        return {
          ok: false,
          error: "Discuss not found",
        };
      }
      await this.opinions.save(
        this.opinions.create({ ...createOpinionInput, discuss })
      );
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

  async deleteOpinion(
    author: User,
    { opinionId }: DeleteOpinionInput
  ): Promise<DeleteOpinionOutput> {
    try {
      const opinion = await this.opinions.findOne({
        where: { id: opinionId },
        relations: ["discuss"],
      });
      if (!opinion) {
        return {
          ok: false,
          error: "Opinion not found",
        };
      }
      if (opinion.discuss.authorId !== author.id) {
        return {
          ok: false,
          error: "Delete for Discusses' master",
        };
      }
      await this.opinions.delete(opinionId);
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

  async findOpinions({
    discussId,
  }: FindOpinionsInput): Promise<FindOpinionsOutput> {
    try {
      const discuss = await this.discusses.findOne({
        where: { id: discussId },
        relations: ["opinions"],
      });
      return {
        ok: true,
        results: discuss.opinions,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
