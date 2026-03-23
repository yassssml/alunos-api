import alunoModel from '../models/alunoModel.js';
import fs from 'fs/promises';
import { processarFoto, removerFoto } from '../utils/fotoHelper.js';

export const uploadFoto = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado' });
        }

        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ error: 'O id não é válido!' });

        const aluno = await alunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            removerFoto(req.file.path);
             return res.status(400).json({ error: 'O aluno não possui registro!' });
        }

        if (aluno.foto) {
            await fs.unlink(aluno.foto).catch(() => {})
        }

        aluno.foto = await processarFoto(req.file.path);

        await aluno.atualizar();
        return res.status(200).jon({ message: 'Foto salva com sucesso', data });

    } catch (error) {
        console.error('Erro ao criar aluno:', error);
        res.status(500).json({ error: 'Erro interno ao salvar foto do aluno.' });
    }
};

export const verFoto = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'O ID enviado não é um número válido.' });
        }

        const aluno = await alunoModel.buscarPorId(parseInt(id));

        if (!aluno) {
            return res.status(404).json({ error: 'Foto do aluno não encontrada.' });
        }

        if (!aluno.foto) {
            return res.status(400).json({
                error: 'Este aluno não tem foto cadastrada'
            });
        };

        res.sendFile(aluno.foto, { root: '-' });
    } catch (error) {
        console.error('Erro ao buscar aluno:', error);
        res.status(500).json({ error: 'Erro ao buscar foto do aluno.' });
    }
};
