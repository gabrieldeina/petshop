import { model, Schema } from "mongoose";
import { mongoose } from "../config/database";

const AnimalSchema = new Schema(
  {
    nome: {
      type: String,
      required: [true, "O campo NOME do ANIMAL é obrigatório!"],
    },
    tipo: {
      type: String,
      enum: ["CACHORRO", "GATO", "CAVALO", "PASSARO"],
      uppercase: true,
      required: [true, "O campo TIPO do ANIMAL é obrigatório!"],
    },
    cliente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "clientes",
      required: [true, "O campo cliente do ANIMAL é obrigatório!"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("animais", AnimalSchema);
