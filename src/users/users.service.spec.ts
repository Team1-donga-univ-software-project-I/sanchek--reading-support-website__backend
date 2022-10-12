import { Test } from "@nestjs/testing";
import { UserService } from "./users.service";

describe("UserService", () => {
  let service: UserService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      providers: [UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });
  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  test.todo("createAccount");
  test.todo("login");
  test.todo("findById");
  test.todo("editProfile");
  test.todo("verifyEmail");
});
