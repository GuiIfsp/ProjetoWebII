import { Request, Response } from 'express';
import { LivroService } from '../services/livro_service';
import { Livro } from '../models/livro_model';

const livroService = new LivroService();

export async function cadastrarLivro(req: Request, res: Response): Promise<void> {
    try {
        const { titulo, autor, id_categoria } = req.body;
        const novoLivro = new Livro(0, titulo, autor, id_categoria);
        const livroCadastrado = await livroService.cadastrarLivro(novoLivro);
        res.status(201).json({
            mensagem: "Livro cadastrado com sucesso!",
            livro: livroCadastrado
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function atualizarLivro(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { titulo, autor, id_categoria } = req.body;
        const livroAtualizado = new Livro(parseInt(id), titulo, autor, id_categoria);
        const livro = await livroService.atualizarLivro(livroAtualizado);
        res.status(200).json({
            mensagem: "Livro atualizado com sucesso!",
            livro: livro
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletarLivro(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        await livroService.deletarLivro(parseInt(id));
        res.status(204).send(); // No content
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function buscarLivro(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const livro = await livroService.buscarLivro(parseInt(id));
        if (livro) {
            res.status(200).json({
                mensagem: "Livro encontrado com sucesso!",
                livro: livro
            });
        } else {
            res.status(404).json({ message: 'Livro não encontrado.' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function listarTodosLivros(req: Request, res: Response): Promise<void> {
    try {
        const livros = await livroService.listarTodosLivros();
        res.status(200).json({
            mensagem: "Livros listados com sucesso!",
            livros: livros
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
