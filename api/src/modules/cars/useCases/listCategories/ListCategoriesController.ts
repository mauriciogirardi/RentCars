import { Request, Response } from "express";

import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  public handle(request: Request, response: Response): Response {
    const categories = this.listCategoriesUseCase.execute();

    return response.status(200).json(categories);
  }
}
