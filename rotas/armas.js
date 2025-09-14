import express from "express";
import Arma from "../modelos/Armas.js";
import Ficha from "../modelos/Fichas.js";
import {autenticar} from "../middleware/auth.js";

const router = express.Router();

//Adicionar arma
router.post("/:fichaId", autenticar, async (req, res) =>{
    try{
        // confirma que a ficha é do usuario logado
        const ficha = await Ficha.findOne({
            where: {id: req.params.fichaId, usuarioId: req.usuarioId },
        });
        if(!ficha) return res.status(404).json({ error: "Ficha não encontrada"});

        const arma = await Arma.create({
            ...req.body,
            fichaId: ficha.id,
        });
        return res.status(201).json(arma);
    }catch (err){
        return res.status(500).json({error: "Erro ao adicionar arma", detalhes: err.message});
    }
});

//Listar armas
router.get("/:fichaId", autenticar, async (req, res)=>{
    try{
        const armas = await Arma.findAll({ where: {fichaId: req.params.fichaId}});
        return res.json(armas);
    }catch (err){
        return res.status(500).json({ error: "Erro ao listar armas", detalhes: err.message});
    }
});

//Atualizar arma
router.put("/:id", autenticar, async (req, res) => {
    try{
        const arma = await Arma.findByPk( req.params.id, {include:{model: Ficha} });
        if(!arma || arma.Ficha.usuarioId !== req.usuarioId){
            return res.status(404).json({ error: "Arma não encontrada"});
        }
        await arma.update(req.body);
        return res.json(arma);
        
    }catch (err){
        return res.status(500).json({ error: "Erro ao atualizar arma", detalhes: err.message});
    }
});

//Deletar arma
router.delete("/:id", autenticar, async(req, res)=> {
    try{
        const arma = await Arma.findByPk(req.params.id, {
            include: {model: Ficha},
        });
        if(!arma || arma.Ficha.usuarioId !== req.usuarioId){
            return res.status(404).json({ error: "Arma não encontrada"});
        }
        
        await arma.destroy();
        return res.json({ msg: "Arma excluida com sucesso"});
    }catch (err){
        return res.status(500).json({ error: "Erro ao excluir arma", detalhes: err.message})
    }
});

export default router;