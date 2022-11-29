import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {
  CreateAccountInput,
  CreateAccountOutput,
} from "./dtos/create-account.dto";
import { LoginInput, LoginOutput } from "./dtos/login.dto";
import { User } from "./entities/user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { UserProfileInput, UserProfileOutput } from "./dtos/user-profile.dto";
import { EditProfileInput, EditProfileOutput } from "./dtos/edit-profile.dto";
import { Archivements } from "./entities/archivement.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Archivements)
    private readonly archivements: Repository<Archivements>,
    private readonly jwtService: JwtService
  ) {}

  async createAccount({
    email,
    password,
    nickname,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        return { ok: false, error: "There is a user with that email already" };
      }
      const user = await this.users.save(
        this.users.create({ email, password, nickname })
      );
      await this.archivements.save(
        this.archivements.create({
          user,
        })
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({
        where: { email },
        select: ["email", "id", "password"],
      });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: "Wrong password",
        };
      }

      const token = this.jwtService.sign(user.id);

      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async userProfile(id: number): Promise<UserProfileOutput> {
    try {
      const user = await this.users.findOneOrFail({
        where: { id },
      });
      return {
        ok: true,
        user,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editProfile(
    userId: number,
    { email, password, nickname }: EditProfileInput
  ): Promise<EditProfileOutput> {
    try {
      const user = await this.users.findOne({
        where: { id: userId },
      });

      if (email) {
        const emailExist = await this.users.findOne({ where: { email } });
        if (emailExist) {
          return {
            ok: false,
            error: "This Email already used",
          };
        }
        user.email = email;
      }
      if (password) {
        user.password = password;
      }
      if (nickname) {
        user.nickname = nickname;
      }
      await this.users.save(user);
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

  async userArchivements(authUser: User) {
    try {
      const archivements = await this.archivements.findOne({
        where: { user: { id: authUser.id } },
      });
      return {
        ok: true,
        archivements,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
