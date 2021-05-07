import { Request, Response } from "express";
import FuncionarioSchema from "../models/FuncionarioSchema";

class FuncionarioController {
  async cadastrar(request: Request, response: Response) {
    if (!request.body) {
      response.status(404).json({
        error: true,
        msg: "Está faltando o body da request!",
      });
    }
    const funcionario = request.body;

    try {
      const result = await FuncionarioSchema.create(funcionario);
      response.status(201).json({
        data: result,
        error: false,
        msg: "Funcionário cadastrado com sucesso!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível cadastrar o funcionário.",
      });
    }
  }

  async listar(request: Request, response: Response) {
    try {
      const funcionarios = await FuncionarioSchema.find();
      response.status(200).json({
        data: funcionarios,
        error: false,
        msg: "Lista de funcionários atualizada!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível listar os funcionários.",
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
    const { id } = request.params;
    const { nome, cpf, telefone, endereco, funcao } = request.body;

    try {
      const funcionario = await FuncionarioSchema.findOne({ _id: id });
      if (funcionario != null) {
        const result = await FuncionarioSchema.updateOne(
          { _id: id },
          {
            $set: {
              nome: nome,
              cpf: cpf,
              telefone: telefone,
              endereco: endereco,
              funcao: funcao,
            },
          }
        );
        response.status(200).json({
          data: result,
          error: false,
          msg: "Funcionário atualizado com sucesso!",
        });
      }
      response.status(404).json({
        data: funcionario,
        error: true,
        msg: "Funcionário não encontrado!",
      });
    } catch (err) {
      response.status(200).json({
        data: err,
        error: true,
        msg: "Funcionário não encontrada!",
      });
    }
  }
}

export { FuncionarioController };
