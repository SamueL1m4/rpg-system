import express from "express";
import Pericias from "../modelos/Pericias.js";
import Ficha from "../modelos/Fichas.js";
import { autenticar } from "../middleware/auth.js";

const router = express.Router();

//Adicionar pericia
router.post("/:fichaId", autenticar, async(req, res)=>{
    try{
        const ficha = await Ficha.findOne({
            where: {id: req.params.fichaId, usuarioId: req.usuarioId}
        });
        if(!ficha) return res.status(404).json({error: "Ficha não encontrada"});

        const pericia = await Pericias.create({
            ...req.body,
            fichaId: ficha.id
        });
        return res.status(201).json(pericia);
    }catch (err){
        return res.status(500).json({error: "Erro ao adicionar pericia", detalhes: err.message});
    }
});

//Listar Pericias
router.get("/:fichaId", autenticar, async(req, res)=>{
    try{
        const pericias = await Pericias.findAll({ where: {fichaId: req.params.fichaId}});
        return res.json(pericias);
    }catch (err){
        return res.status(500).json({ error: "Erro ao listar pericias", detalhes: err.message});
    }
});

//Atualizar pericia
router.put("/:id", autenticar, async(req, res)=>{
    try{
        const pericia = await Pericias.findByPk(req.params.id, {
            include : {model: Ficha}
        });
        if(!pericia) return res.status(404).json({ error: "Pericia não encontrada"});

        await pericia.update(req.body);
        return res.json(pericia);
    }catch (err){
        return res.status(500).json({error: "Erro ao atualizar pericia", detalhes: err.message});
    }
});

//Deletar Pericia
router.delete("/:id", autenticar, async(req, res)=>{
    try{
        const pericia = await Pericias.findByPk(req.params.id, {
            include: {model: Ficha},
        });
        if(!pericia) return res.status(404).json({error: "Pericia não encontrada"});

        await pericia.destroy();
        return res.json({ msg: "Pericia excluida com sucesso!"});
    }catch (err){
        return res.status(500).json({error: "Erro ao deletar pericia", detalhes: err.message});
    }
});

export default router;