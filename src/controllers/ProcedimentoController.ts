import { Request, Response } from "express";
import ProcedimentoSchema from "../models/ProcedimentoSchema";

class ProcedimentoController {
  async cadastrar(request: Request, response: Response) {
    if (!request.body) {
      response.status(404).json({
        error: true,
        msg: "Está faltando o body da request!",
      });
    }
    const { nome } = request.body;

    try {
      const procedimento = await ProcedimentoSchema.findOne({ nome: nome });
      if (procedimento == null) {
        const result = await ProcedimentoSchema.create(request.body);
        response.status(201).json({
          data: result,
          error: false,
          msg: "Procedimento cadastrado com sucesso!",
        });
      }
      response.status(404).json({
        data: procedimento,
        error: true,
        msg: "Procedimento já cadastrado no sistema!",
      });
    } catch (err) {
      response.status(400).json({
        data: err,
        error: true,
        msg: "Não foi possível cadastrar o procedimento.",
      });
    }
  }

  async listar(request: Request, response: Response) {
    try {
      const procedimentos = await ProcedimentoSchema.find();
      response.status(200).json({
        data: procedimentos,
        error: false,
        msg: "Lista de procedimentos atualizada!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível listar os procedimentos.",
      });
    }
  }

  async alterar(request: Request, response: Response) {
    if (!request.body) {
      response.status(404).json({
        error: true,
        msg: "Está faltando o body da request!",
      });
    }
    const { nome, valor } = request.body;

    try {
      const procedimento = await ProcedimentoSchema.findOne({ nome: nome });
      if (procedimento != null) {
        const result = await ProcedimentoSchema.updateOne(
          { nome: nome },
          {
            $set: {
              valor: valor,
            },
          }
        );
        response.status(200).json({
          data: result,
          error: false,
          msg: "Procedimento atualizado com sucesso!",
        });
      }
      response.status(404).json({
        data: procedimento,
        error: true,
        msg: "Procedimento não encontrado, cadastreo!",
      });
    } catch (err) {
      response.status(200).json({
        data: err,
        error: true,
        msg: "Procedimento não encontrada!",
      });
    }
  }
}

export { ProcedimentoController };
