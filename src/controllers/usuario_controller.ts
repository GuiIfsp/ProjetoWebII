import { Request, Response } from 'express';
import { UsuarioService } from '../services/usuario_service';
import { Usuario } from '../models/usuario_model';

const usuarioService = new UsuarioService();

export async function cadastrarUsuario(req: Request, res: Response): Promise<void> {
    try {
        const { id_pessoa, senha } = req.body;
        const novoUsuario = new Usuario(0, id_pessoa, senha);
        const usuarioCadastrado = await usuarioService.cadastrarUsuario(novoUsuario);
        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            usuario: usuarioCadastrado
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function atualizarUsuario(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const { id_pessoa, senha } = req.body;
        const usuarioAtualizado = new Usuario(parseInt(id), id_pessoa, senha);
        const usuario = await usuarioService.atualizarUsuario(usuarioAtualizado);
        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso!",
            usuario: usuario
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function deletarUsuario(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        await usuarioService.deletarUsuario(parseInt(id));
        res.status(204).send(); // No content
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function buscarUsuario(req: Request, res: Response): Promise<void> {
    try {
        const { id } = req.params;
        const usuario = await usuarioService.buscarUsuario(parseInt(id));
        if (usuario) {
            res.status(200).json({
                mensagem: "Usuário encontrado com sucesso!",
                usuario: usuario
            });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado.' });
        }
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}

export async function listarTodosUsuarios(req: Request, res: Response): Promise<void> {
    try {
        const usuarios = await usuarioService.listarTodosUsuarios();
        res.status(200).json({
            mensagem: "Usuários listados com sucesso!",
            usuarios: usuarios
        });
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
}
