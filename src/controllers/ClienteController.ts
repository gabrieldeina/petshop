import { Request, Response } from "express";
import ClienteSchema from "../models/ClienteSchema";

class ClienteController {
  async cadastrar(request: Request, response: Response) {
    if (!request.body) {
      response.status(404).json({
        error: true,
        msg: "Está faltando o body da request!",
      });
    }

    try {
      const cliente = await ClienteSchema.create(request.body);
      response.status(201).json({
        data: cliente,
        error: false,
        msg: "Cliente cadastrado com sucesso!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível cadastrar o cliente.",
      });
    }
  }

  async listar(request: Request, response: Response) {
    try {
      const clientes = await ClienteSchema.find()
                              .populate("animal","nome");
      response.status(200).json({
        data: clientes,
        error: false,
        msg: "Lista de clientes atualizada!",
      });
    } catch (error) {
      response.status(400).json({
        data: error,
        error: true,
        msg: "Não foi possível listar os clientes.",
      });
    }
  }

  async listarPorId(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const cliente = await ClienteSchema.find({ _id: id }).
                            populate("animal","nome");

      if (cliente != null) {
        response
          .status(200)
          .json({ data: cliente, error: false, msg: "Cliente encontrado!" });
      }
      response
        .status(400)
        .json({ data: cliente, error: false, msg: "Cliente não encontrado!" });
    } catch (error) {
      response
        .status(400)
        .json({ data: error, error: true, msg: "Formato de id não válido!" });
    }
  }

  async excluir(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const cliente = await ClienteSchema.deleteOne({ _id: id });
      if (cliente != null) {
        response
          .status(200)
          .json({ data: cliente, error: false, msg: "Cliente excluído!" });
      }
      response
        .status(400)
        .json({ data: cliente, error: false, msg: "Cliente não encontrado!" });
    } catch (error) {
      response
        .status(400)
        .json({ data: error, error: true, msg: "Formato de id não válido!" });
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
    const { nome, cpf, telefone, endereco } = request.body;

    try {
      const cliente = await ClienteSchema.findOne({ _id: id });
      if (cliente != null) {
        const result = await ClienteSchema.updateOne(
          { _id: id },
          {
            $set: {
              nome: nome,
              cpf: cpf,
              telefone: telefone,
              endereco: endereco,
            },
          }
        );
        response.status(200).json({
          data: result,
          error: false,
          msg: "Cliente atualizado com sucesso!",
        });
      }
      response.status(404).json({
        data: cliente,
        error: true,
        msg: "Cliente não encontrado!",
      });
    } catch (err) {
      response.status(200).json({
        data: err,
        error: true,
        msg: "Cliente não encontrado!",
      });
    }
  }
}
export { ClienteController };
