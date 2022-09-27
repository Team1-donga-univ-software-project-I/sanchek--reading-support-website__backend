import { Query, Resolver } from "@nestjs/graphql";

@Resolver()
export class SanchekResolver {
  @Query((returns) => Boolean)
  isPizzaGood(): Boolean {
    return true;
  }
}
