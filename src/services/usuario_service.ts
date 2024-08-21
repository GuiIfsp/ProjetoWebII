import { UsuarioRepository } from '../repositories/usuario_repository';
import { Usuario } from '../models/usuario_model';

export class UsuarioService {
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.usuarioRepository = new UsuarioRepository();
    }

    async cadastrarUsuario(usuario: Usuario): Promise<Usuario> {
        return await this.usuarioRepository.inserirUsuario(usuario);
    }

    async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
        const usuarioExistente = await this.usuarioRepository.filtrarUsuario(usuario.id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado.');
        }

        return await this.usuarioRepository.atualizarUsuario(usuario);
    }

    async deletarUsuario(id: number): Promise<void> {
        const usuarioExistente = await this.usuarioRepository.filtrarUsuario(id);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado.');
        }
    
        await this.usuarioRepository.deletarUsuario(id);
    }    

    async buscarUsuario(id: number): Promise<Usuario | null> {
        return await this.usuarioRepository.filtrarUsuario(id);
    }

    async listarTodosUsuarios(): Promise<Usuario[]> {
        return await this.usuarioRepository.listarTodosUsuarios();
    }
}
