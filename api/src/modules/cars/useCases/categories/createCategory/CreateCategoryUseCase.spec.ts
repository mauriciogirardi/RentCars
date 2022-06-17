import { AppError } from "../../../../../shared/errors/AppError";
import { CategoryRepositoryMocks } from "../../../repositories/mocks/CategoryRepositoryMocks";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryMock: CategoryRepositoryMocks;

describe("CreateCategoryUserCase", () => {
  beforeAll(() => {
    categoriesRepositoryMock = new CategoryRepositoryMocks();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryMock);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Automatic",
      description: "automatic car",
    };
    await createCategoryUseCase.execute(category);

    const newCategory = await categoriesRepositoryMock.findByName(
      category.name
    );

    expect(newCategory).toHaveProperty("id");
  });

  it("shouldn't be able to create a category with same name", async () => {
    expect(async () => {
      const category = {
        name: "Automatic",
        description: "automatic car",
      };
      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
