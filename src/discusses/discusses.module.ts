import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscussesResolver, OpinionsResolver } from "./discusses.resolver";
import { DiscussesService } from "./discusses.service";
import { Discuss } from "./entities/discuss.entity";
import { Opinion } from "./entities/opinion.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Discuss, Opinion])],
  providers: [DiscussesResolver, DiscussesService, OpinionsResolver],
})
export class DiscussesModule {}
