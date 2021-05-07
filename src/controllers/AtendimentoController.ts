import { Request, Response } from "express";
import AtendimentoSchema from "../models/AtendimentoSchema";

class AtendimentoController {
  async cadastrar(request: Request, response: Response) {
    try {
      const atendimento = await AtendimentoSchema.create(request.body);

      response.status(201).json({
        data: atendimento,
        error: false,
        msg: "Atendimento cadastrado com sucesso!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível cadastrar o atendimento.",
      });
    }
  }

  async listar(request: Request, response: Response) {
    try {
      const atendimentos = await AtendimentoSchema.find();
      response.status(200).json({
        data: atendimentos,
        error: false,
        msg: "Lista de atendimentos!",
      });
    } catch (err) {
      response.status(400).json({
        data: err,
        error: true,
        msg: "Não foi possível listar os atendimentos.",
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
    const { data_agendamento } = request.body;

    try {
      const atendimento = await AtendimentoSchema.findOne({ _id: id });
      if (atendimento != null) {
        const result = await AtendimentoSchema.updateOne(
          { _id: id },
          { $set: { data_agendamento: data_agendamento } }
        );
        response.status(200).json({
          data: result,
          error: false,
          msg: "Atendimento atualizado com sucesso!",
        });
      }
      response.status(404).json({
        data: atendimento,
        error: true,
        msg: "Atendimento não encontrado!",
      });
    } catch (err) {
      response.status(200).json({
        data: err,
        error: true,
        msg: "Atendimento não encontrado!",
      });
    }
  }
}

export { AtendimentoController };
