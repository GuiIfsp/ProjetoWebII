import { Request, Response } from 'express';
import { PessoaService } from '../services/pessoa_service';
import { Pessoa } from '../models/pessoa_model';

const pessoaService = new PessoaService();

export async function cadastrarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const { nome, email } = req.body;
        if (!nome || !email) {
            res.status(400).json({ message: 'Nome e e-mail são obrigatórios.' });
            return;
        }

        const novaPessoa = new Pessoa(0, nome, email);
        const pessoaCadastrada = await pessoaService.cadastrarPessoa(novaPessoa);
        res.status(201).json({
            mensagem: "Pessoa cadastrada com sucesso!",
            pessoa: pessoaCadastrada
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function atualizarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id, 10);
        const { nome, email } = req.body;
        if (!id || !nome || !email) {
            res.status(400).json({ message: 'ID, nome e e-mail são obrigatórios.' });
            return;
        }

        const pessoaAtualizada = new Pessoa(id, nome, email);
        const pessoa = await pessoaService.atualizarPessoa(pessoaAtualizada);
        res.status(200).json({
            mensagem: "Pessoa atualizada com sucesso!",
            pessoa: pessoa
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            res.status(400).json({ message: 'ID é obrigatório.' });
            return;
        }

        await pessoaService.deletarPessoa(id);
        res.status(204).send(); // No content
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function buscarPessoa(req: Request, res: Response): Promise<void> {
    try {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            res.status(400).json({ message: 'ID é obrigatório.' });
            return;
        }

        const pessoa = await pessoaService.buscarPessoa(id);
        if (pessoa) {
            res.status(200).json({
                mensagem: "Pessoa encontrada com sucesso!",
                pessoa: pessoa
            });
        } else {
            res.status(404).json({ message: 'Pessoa não encontrada.' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function listarTodasPessoas(req: Request, res: Response): Promise<void> {
    try {
        const pessoas = await pessoaService.listarTodasPessoas();
        res.status(200).json({
            mensagem: "Pessoas listadas com sucesso!",
            pessoas: pessoas
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
