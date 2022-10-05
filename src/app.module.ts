import { Module } from "@nestjs/common";
import * as Joi from "joi";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./users/entities/user.entity";
import { UsersModule } from "./users/users.module";
import { CoreModule } from "./common/core.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === "development"
          ? ".env.development.local"
          : ".env.test.local",
      ignoreEnvFile: process.env.NODE_ENV === "production",
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "production").required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== "production",
      logging: process.env.NODE_ENV !== "production",
      entities: [User],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      debug: false,
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    UsersModule,
    CoreModule,
  ],
})
export class AppModule {}
