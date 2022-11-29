import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sanchek } from "./entities/sanchek.entity";
import { SanchekResolver } from "./sancheks.resolver";
import { SanchekService } from "./sancheks.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sanchek])],
  providers: [SanchekResolver, SanchekService],
  exports: [SanchekService],
})
export class SancheksModule {}
