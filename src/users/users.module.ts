import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Archivements } from "./entities/archivement.entity";
import { User } from "./entities/user.entity";
import { ArchivementResolver, UserResolver } from "./users.resolver";
import { UserService } from "./users.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Archivements])],
  providers: [UserResolver, UserService, ArchivementResolver],
  exports: [UserService],
})
export class UsersModule {}
