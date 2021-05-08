import { Router } from "express";
import { AnimalController } from "../controllers/AnimalController";
import { AtendimentoController } from "../controllers/AtendimentoController";
import { ClienteController } from "../controllers/ClienteController";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { ProcedimentoController } from "../controllers/ProcedimentoController";

const router = Router();

const clienteController = new ClienteController();
const funcionarioController = new FuncionarioController();
const animalController = new AnimalController();
const atendimentoController = new AtendimentoController();
const procedimentoController = new ProcedimentoController();

router.get("/cliente/listar", clienteController.listar);
router.get("/cliente/listar/:id", clienteController.listarPorId);
router.post("/cliente/cadastrar", clienteController.cadastrar);
router.delete("/cliente/excluir/:id", clienteController.excluir);
router.put("/cliente/alterar/:id", clienteController.alterar);

router.get("/funcionario/listar", funcionarioController.listar)
router.post("/funcionario/cadastrar", funcionarioController.cadastrar);

router.get("/animal/listar", animalController.listar);
router.post("/animal/cadastrar", animalController.cadastrar);
router.put("/animal/alterar/:id", animalController.alterarPorId);

router.post("/atendimento/cadastrar", atendimentoController.cadastrar);
router.get("/atendimento/listar", atendimentoController.listar);
router.put("/atendimento/alterar/:id", atendimentoController.alterarPorId);

router.post("/procedimento/cadastrar", procedimentoController.cadastrar);
router.put("/procedimento/alterar/", procedimentoController.alterar);
router.get("/procedimento/listar", procedimentoController.listar);

export { router };
