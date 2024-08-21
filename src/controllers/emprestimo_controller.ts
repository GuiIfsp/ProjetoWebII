import { Request, Response } from 'express';
import { EmprestimoService } from '../services/emprestimo_service';
import { Emprestimo } from '../models/emprestimo_model';

const emprestimoService = new EmprestimoService();

export async function adicionarEmprestimo(req: Request, res: Response) {
    try {
        const { id_livro, id_usuario, data_emprestimo, data_devolucao } = req.body;
        const emprestimo = new Emprestimo(
            0,
            id_livro,
            id_usuario,
            new Date(data_emprestimo),
            new Date(data_devolucao)
        );
        const novoEmprestimo = await emprestimoService.registrarEmprestimo(emprestimo);
        res.status(201).json({
            mensagem: "Empréstimo adicionado com sucesso!",
            emprestimo: novoEmprestimo
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function atualizarEmprestimo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { id_livro, id_usuario, data_emprestimo, data_devolucao } = req.body;
        const emprestimo = new Emprestimo(
            parseInt(id),
            id_livro,
            id_usuario,
            new Date(data_emprestimo),
            new Date(data_devolucao)
        );
        const emprestimoAtualizado = await emprestimoService.atualizarEmprestimo(emprestimo);
        res.status(200).json({
            mensagem: "Empréstimo atualizado com sucesso!",
            emprestimo: emprestimoAtualizado
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletarEmprestimo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await emprestimoService.deletarEmprestimo(parseInt(id));
        res.status(204).json({
            mensagem: "Empréstimo deletado com sucesso!"
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function buscarEmprestimo(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const emprestimo = await emprestimoService.buscarEmprestimo(parseInt(id));
        if (emprestimo) {
            res.status(200).json({
                mensagem: "Empréstimo encontrado com sucesso!",
                emprestimo: emprestimo
            });
        } else {
            res.status(404).json({ message: 'Empréstimo não encontrado.' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function listarTodosEmprestimos(req: Request, res: Response) {
    try {
        const emprestimos = await emprestimoService.listarTodosEmprestimos();
        res.status(200).json({
            mensagem: "Empréstimos listados com sucesso!",
            emprestimos: emprestimos
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
