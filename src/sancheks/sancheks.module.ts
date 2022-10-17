import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookName } from "./entities/book-name.entity";
import { Sanchek } from "./entities/sanchek.entity";
import { BookNameResolver, SanchekResolver } from "./sancheks.resolver";
import { SanchekService } from "./sancheks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sanchek, BookName])],
  providers: [SanchekResolver, SanchekService, BookNameResolver],
})
export class SancheksModule {}
