import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://petshop:petshop@clusterpetshop.xjsmi.mongodb.net/TopicosEspeciais?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Aplicação conectada com o banco de dados");
  })
  .catch((erro) => {
    console.log(`Erro ao conectar com o banco de dados: ${erro}`);
  });

export { mongoose };
