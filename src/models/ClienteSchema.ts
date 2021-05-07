import { model, Schema } from "mongoose";
import { mongoose } from "../config/database";

const ClienteSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O campo NOME do CLIENTE é obrigatório!"],
      min: [5, "O campo NOME deve ter no mínimo 5 caracteres!"],
      max: [128, "O campo NOME deve ter no máximo 128 caracteres!"],
    },
    cpf: {
      type: String,
      required: [true, "O campo CPF do CLIENTE é obrigatório!"],
      min: [
        11,
        "O campo CPF deve ter no mínimo 11 dígitos. Exemplo: 11111111111",
      ],
      max: [
        14,
        "O campo CPF deve ter no máximo 14 dígitos. Exemplo: 111.111.111-11",
      ],
    },
    telefone: {
      type: String,
      required: [true, "O campo TELEFONE do CLIENTE é obrigatório!"],
      min: [
        11,
        "O campo TELEFONE deve ter no mínio 11 dígitos. Exemplo: 41999887766",
      ],
      max: [
        14,
        "O campo TELEFONE deve ter no máximo 14 dígitos. Exemplo: (41)99988-7766",
      ],
    },
    endereco: {
      type: String,
      required: [true, "O campo ENDERECO do CLIENTE é obrigatório!"],
      min: [5, "O campo ENDERECO deve ter no mínimo 5 caracteres!"],
    },
    animal: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "animais",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("clientes", ClienteSchema);
