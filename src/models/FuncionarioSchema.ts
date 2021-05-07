import { model, Schema } from "mongoose";

const FuncionarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O campo NOME do FUNCIONARIO é obrigatório!"],
      min: [5, "O campo NOME deve ter no mínimo 5 caracteres!"],
      max: [128, "O campo NOME deve ter no máximo 128 caracteres!"],
    },
    cpf: {
      type: String,
      required: [true, "O campo CPF do FUNCIONARIO é obrigatório!"],
      min: [11, "O campo deve ter 14 dígitos. Exemplo: 11111111111"],
      max: [14, "O campo deve ter no máx 14 dígitos. Exemplo: 111.111.111-11"],
    },
    telefone: {
      type: String,
      required: [true, "O campo TELEFONE do FUNCIONARIO é obrigatório!"],
      min: [9, "O campo deve ter 14 dígitos. Exemplo: 99999999"],
    },
    endereco: {
      type: String,
      required: [true, "O campo ENDERECO no FUNCIONARIO é obrigatório"],
    },
    funcao: {
      type: String,
      enum: ["VETERINÁRIO", "AUXILIAR"],
      uppercase: true,
      required: [true, "O campo FUNCAO no FUNCIONARIO é obrigatório!"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("funcionarios", FuncionarioSchema);
