import express from "express";
import FichaModel from "../modelos/Fichas.js";
import usuario from "../modelos/usuario.js";
import { autenticar } from "../middleware/auth.js";

console.log( "Arquivo rotas/ficha.js carregado!");

const router = express.Router();

//Criar ficha (apenas usuario logado)
router.post("/", autenticar, async (req, res) => {
    try {
        const novaFicha = await FichaModel.create({
            ...req.body,
            usuarioId : req.usuarioId,
        });
        res.status(201).json(novaFicha);
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar ficha", detalhes: err.message});
    }
});

//Listar fichas do usuario logado
router.get("/", autenticar, async (req, res) => {
    try {
        const fichas = await FichaModel.findAll({where: {usuarioId: req.usuarioId} });
        res.json(fichas);
    } catch (err) {
        res.status(500).json({error: "Erro ao  buscar fichas"});
    }
});

//Ver uma ficha específica 
router.get("/:id", autenticar, async (req, res) =>{
    try{
        const umaFicha = await FichaModel.findOne({
            where : {id: req.params.id, usuarioId: req.usuarioId},
            include: usuario,
        });
        if(!umaFicha) return res.status(404).json({ error: "Ficha não encontrada" });
        res.json(umaFicha);
    } catch (err) {
        res.status(500).json ({error: "Erro ao buscar ficha "});
    }
});

//Atualizar ficha
router.put("/:id", autenticar, async (req, res) =>{
    try {
        const umaFicha = await FichaModel.findOne({ where : {id: req.params.id, usuarioId: req.usuarioId} });
        if (!umaFicha) return res.status(404).json({error: "Ficha não encontrada" });

        await umaFicha.update(req.body);
        res.json(umaFicha);
    } catch (err){
        res.status(500).json({ error: "Erro ao atualizar ficha" });
    }
});

// Deletar ficha
router.delete("/:id", autenticar, async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (Number.isNaN(id)) { return res.status(400).json({ error: "ID inválido" }); }

        // procura a ficha do usuário logado
        const registro = await FichaModel.findOne({
        where: { id: id, usuarioId: req.usuarioId }
        });

        if (!registro) {
            console.log("Ficha não encontrada para esse id/usuario", { id, usuarioId: req.usuarioId });
            return res.status(404).json({ error: "Ficha não encontrada" });
        }

        await registro.destroy();
        console.log("Ficha deletada com sucesso", { id, usuarioId: req.usuarioId });
        return res.json({ msg: "Ficha excluída com sucesso" });
    } catch (err) {
        console.error("Erro ao deletar ficha:", err);
        return res.status(500).json({ error: "Erro ao excluir ficha", detalhes: err.message });
    }
});

export default router;
