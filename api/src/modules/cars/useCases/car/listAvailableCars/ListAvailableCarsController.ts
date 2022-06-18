import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListCarsAvailableUseCase";

export class ListAvailableCarsController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { brand, name, category_id } = request.query;
    const listAvailableCarsUseCase = container.resolve(
      ListAvailableCarsUseCase
    );

    const availableCars = await listAvailableCarsUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return response.status(200).json(availableCars);
  }
}
