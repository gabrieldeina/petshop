import { Request, Response } from "express";
import AnimalSchema from "../models/AnimalSchema";

class AnimalController {
  async cadastrar(request: Request, response: Response) {
    if (!request.body) {
      response.status(404).json({
        error: true,
        msg: "Está faltando o body da request!",
      });
    }

    try {
      const animal = await AnimalSchema.create(request.body);
      response.status(201).json({
        data: animal,
        error: false,
        msg: "Animal cadastrado com sucesso!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível cadastrar o animal.",
      });
    }
  }

  async listar(request: Request, response: Response) {
    try {
      const animais = await AnimalSchema.find();
      response.status(200).json({
        data: animais,
        error: false,
        msg: "Lista de animais atualizada!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível listar os animais.",
      });
    }
  }

  async alterarPorId(request: Request, response: Response) {
    if (!request.body) {
      response.status(404).json({
        error: true,
        msg: "Está faltando o body da request!",
      });
    }
    const { id } = request.params;
    const { nome, cliente } = request.body;

    try {
      const animal = await AnimalSchema.findOne({ _id: id });
      if (animal != null) {
        const result = await AnimalSchema.updateOne(
          { _id: id },
          {
            $set: {
              nome: nome,
              cliente: cliente,
            },
          }
        );
        response.status(200).json({
          data: result,
          error: false,
          msg: "Animal atualizado com sucesso!",
        });
      }
      response.status(404).json({
        data: animal,
        error: true,
        msg: "Animal não encontrado!",
      });
    } catch (err) {
      response.status(200).json({
        data: err,
        error: true,
        msg: "Animal não encontrado!",
      });
    }
  }
}

export { AnimalController };
