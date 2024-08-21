import { Request, Response } from 'express';
import { CategoriaService } from '../services/categoria_service';
import { Categoria } from '../models/categoria_model';

const categoriaService = new CategoriaService();

export async function cadastrarCategoria(req: Request, res: Response): Promise<void> {
    try {
        const { nome } = req.body;
        const novaCategoria = new Categoria(0, nome);
        const categoriaCadastrada = await categoriaService.cadastrarCategoria(novaCategoria);
        res.status(201).json({
            mensagem: "Categoria cadastrada com sucesso!",
            categoria: categoriaCadastrada
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function atualizarCategoria(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { nome } = req.body;
        const categoriaAtualizada = new Categoria(parseInt(id), nome);
        const categoria = await categoriaService.atualizarCategoria(categoriaAtualizada);
        res.status(200).json({
            mensagem: "Categoria atualizada com sucesso!",
            categoria: categoria
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletarCategoria(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        await categoriaService.deletarCategoria(parseInt(id));
        res.status(204).send(); // No content
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function buscarCategoria(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const categoria = await categoriaService.buscarCategoria(parseInt(id));
        if (categoria) {
            res.status(200).json({
                mensagem: "Categoria encontrada com sucesso!",
                categoria: categoria
            });
        } else {
            res.status(404).json({ message: 'Categoria não encontrada.' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function listarTodasCategorias(req: Request, res: Response): Promise<void> {
    try {
        const categorias = await categoriaService.listarTodasCategorias();
        res.status(200).json({
            mensagem: "Categorias listadas com sucesso!",
            categorias: categorias
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function buscarLivrosPorCategoria(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const livros = await categoriaService.buscarLivrosPorCategoria(parseInt(id));
        if (livros.length > 0) {
            res.status(200).json({
                mensagem: "Livros encontrados para a categoria!",
                livros: livros
            });
        } else {
            res.status(404).json({ message: 'Nenhum livro encontrado para esta categoria.' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
