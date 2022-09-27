import { Module } from "@nestjs/common";
import { SanchekResolver } from "./sancheks.resolver";

@Module({
  providers: [SanchekResolver],
})
export class SancheksModule {}
