import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUploadCarImageUseCase } from "./DeleteUploadCarImageUseCase";

export class DeleteUploadCarImageController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUploadCarImageUseCase = container.resolve(
      DeleteUploadCarImageUseCase
    );

    await deleteUploadCarImageUseCase.execute(id);

    return response.status(201).send();
  }
}
