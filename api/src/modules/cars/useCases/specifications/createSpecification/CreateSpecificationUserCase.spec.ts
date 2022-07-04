import { AppError } from "../../../../../shared/errors/AppError";
import { SpecificationsRepositoryMocks } from "../../../repositories/mocks/SpecificationsRepositoryMocks";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryMock: SpecificationsRepositoryMocks;

describe("CreateSpecificationUserCase", () => {
  beforeAll(() => {
    specificationsRepositoryMock = new SpecificationsRepositoryMocks();
    createSpecificationUseCase = new CreateSpecificationUseCase(
      specificationsRepositoryMock
    );
  });

  it("should be able to create a new specification", async () => {
    const specification = {
      name: "Specification",
      description: "Specification test description",
    };
    await createSpecificationUseCase.execute(specification);

    const newCategory = await specificationsRepositoryMock.findByName(
      specification.name
    );

    expect(newCategory).toHaveProperty("id");
  });

  it("shouldn't be able to create a specification with same name", async () => {
    await createSpecificationUseCase.execute({
      name: "Specification test",
      description: "Specification test description",
    });

    await expect(
      createSpecificationUseCase.execute({
        name: "Specification test",
        description: "Specification test description",
      })
    ).rejects.toEqual(new AppError("Specification already exists!"));
  });
});
