import { Request, Response } from "express";

import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

export class ListSpecificationsController {
  constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {}

  public handle(request: Request, response: Response): Response {
    const specifications = this.listSpecificationsUseCase.execute();

    return response.status(200).json(specifications);
  }
}
