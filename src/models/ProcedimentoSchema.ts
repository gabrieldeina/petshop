import { model, Schema } from "mongoose";

const ProcedimentoSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O campo nome do procedimento é obrigatório!"],
    },
    valor: {
      type: Number,
      required: [true, "O campo valor do procedimento é obrigatório!"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("procedimentos", ProcedimentoSchema);
