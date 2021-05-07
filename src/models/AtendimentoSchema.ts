import { model, Schema } from "mongoose";
import { mongoose } from "../config/database";

const AtendimentoSchema = new Schema(
  {
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clientes",
      required: true,
    },
    funcionario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "funcionarios",
      required: true,
    },
    animal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "animais",
      required: true,
    },
    procedimento: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "procedimentos",
        required: true,
      },
    ],
    // Precisa ser melhor desenvolvido
    data_agendamento: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("atendimentos", AtendimentoSchema);
