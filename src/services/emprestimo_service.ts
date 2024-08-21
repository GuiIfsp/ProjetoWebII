import { EmprestimoRepository } from '../repositories/emprestimo_repository';
import { LivroRepository } from '../repositories/livro_repository';
import { UsuarioRepository } from '../repositories/usuario_repository';
import { Emprestimo } from '../models/emprestimo_model';

export class EmprestimoService {
    private emprestimoRepository: EmprestimoRepository;
    private livroRepository: LivroRepository;
    private usuarioRepository: UsuarioRepository;

    constructor() {
        this.emprestimoRepository = new EmprestimoRepository();
        this.livroRepository = new LivroRepository();
        this.usuarioRepository = new UsuarioRepository();
    }

    async registrarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
        const usuarioExistente = await this.usuarioRepository.filtrarUsuario(emprestimo.id_usuario);
        if (!usuarioExistente) {
            throw new Error('Usuário não encontrado.');
        }

        const livroExistente = await this.livroRepository.filtrarLivro(emprestimo.id_livro);
        if (!livroExistente) {
            throw new Error('Livro não encontrado.');
        }

        return await this.emprestimoRepository.inserirEmprestimo(emprestimo);
    }

    async atualizarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
        const emprestimoExistente = await this.emprestimoRepository.filtrarEmprestimo(emprestimo.id);
        if (!emprestimoExistente) {
            throw new Error('Empréstimo não encontrado.');
        }

        return await this.emprestimoRepository.atualizarEmprestimo(emprestimo);
    }

    async deletarEmprestimo(id: number): Promise<void> {
        const emprestimoExistente = await this.emprestimoRepository.filtrarEmprestimo(id);
        if (!emprestimoExistente) {
            throw new Error('Empréstimo não encontrado.');
        }

        await this.emprestimoRepository.deletarEmprestimo(id);
    }

    async buscarEmprestimo(id: number): Promise<Emprestimo | null> {
        return await this.emprestimoRepository.filtrarEmprestimo(id);
    }

    async listarTodosEmprestimos(): Promise<Emprestimo[]> {
        return await this.emprestimoRepository.filtrarTODOSEmprestimo();
    }
}
