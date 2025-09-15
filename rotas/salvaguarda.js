import express from "express";
import Salvaguarda from "../modelos/Salvaguardas.js";
import Ficha from "../modelos/Fichas.js";
import { autenticar } from "../middleware/auth.js";

const router = express.Router();

//Adicionar Salvaguarda
router.post("/:fichaId", autenticar, async(req, res)=>{
    try{
        const ficha = await Ficha.findOne({
            where: {id: req.params.fichaId, usuarioId: req.usuarioId}
        });
        if(!ficha) return res.status(404).json({error: "Ficha não encontrada"});

        const salvaguarda = await Salvaguarda.create({
            ...req.body,
            fichaId: ficha.id
        });
        return res.status(201).json(salvaguarda);
    }catch (err){
        return res.status(500).json({ error: "Erro ao adicionar salvaguarda", detalhes: err.message});
    }
});

//Listar Salvaguardas
router.get("/:fichaId", autenticar, async(req, res)=>{
    try{
        const salvaguardas = await Salvaguarda.findAll({ where: {fichaId: req.params.fichaId}});
        return res.json(salvaguardas);
    }catch (err){
        return res.status(500).json({ error: "Erro ao listar salvaguardas", detalhes: err.message});
    }
});

//Atualizar salvaguarda
router.put("/:id", autenticar, async(req, res)=>{
    try{
        const salvaguarda = await Salvaguarda.findByPk(req.params.id, {
            include : {model: Ficha}
        });
        if(!salvaguarda) return res.status(404).json({ error: "salvaguarda não encontrada"});

        await salvaguarda.update(req.body);
        return res.json(salvaguarda);
    }catch (err){
        return res.status(500).json({error: "Erro ao atualizar salvaguarda", detalhes: err.message});
    }
});

//Deletar salvaguarda
router.delete("/:id", autenticar, async(req, res)=>{
    try{
        const salvaguarda = await Salvaguarda.findByPk(req.params.id, {
            include: {model: Ficha},
        });
        if(!salvaguarda) return res.status(404).json({error: "salvaguarda não encontrada"});

        await salvaguarda.destroy();
        return res.json({ msg: "salvaguarda excluida com sucesso!"});
    }catch (err){
        return res.status(500).json({error: "Erro ao deletar salvaguarda", detalhes: err.message});
    }
});

export default router;