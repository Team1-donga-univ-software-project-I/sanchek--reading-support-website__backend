import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { SancheksModule } from "./sancheks/sancheks.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: false,
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    SancheksModule,
  ],
})
export class AppModule {}
