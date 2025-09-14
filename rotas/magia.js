import express from "express";
import Magia from "../modelos/Magias.js";
import Ficha from "../modelos/Fichas.js";
import {autenticar} from "../middleware/auth.js";

const router = express.Router();

//Adicionar Magia
router.post("/:fichaId", autenticar, async(req, res)=>{
    try{
        const ficha = await Ficha.findOne({
            where: {id: req.params.fichaId, usuarioId: req.usuarioId}
        });
        if(!ficha) return res.status(404).json({error: "Ficha não encontrada"});

        const magia = await Magia.create({
            ...req.body,
            fichaId: ficha.id
        });
        return res.status(201).json(magia);
    }catch (err){
        return res.status(500).json({ error: "Erro ao adicionar magia", detalhes: err.message});
    }
});

//Listar Magias
router.get("/:fichaId", autenticar, async(req, res)=>{
    try{
        const magias = await Magia.findAll({ where: {fichaId: req.params.fichaId}});
        return res.json(magias);
    }catch (err){
        return res.status(500).json({ error: "Erro ao listar magias", detalhes: err.message});
    }
});

//Atualizar magia
router.put("/:id", autenticar, async(req, res)=>{
    try{
        const magia = await Magia.findByPk(req.params.id, {
            include : {model: Ficha}
        });
        if(!magia) return res.status(404).json({ error: "Magia não encontrada"});

        await magia.update(req.body);
        return res.json(magia);
    }catch (err){
        return res.status(500).json({error: "Erro ao atualizar magia", detalhes: err.message});
    }
});

//Deletar Magia
router.delete("/:id", autenticar, async(req, res)=>{
    try{
        const magia = await Magia.findByPk(req.params.id, {
            include: {model: Ficha},
        });
        if(!magia) return res.status(404).json({error: "Magia não encontrada"});

        await magia.destroy();
        return res.json({ msg: "Magia excluida com sucesso!"});
    }catch (err){
        return res.status(500).json({error: "Erro ao deletar magia", detalhes: err.message});
    }
});

export default router;