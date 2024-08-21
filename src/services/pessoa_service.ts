import { PessoaRepository } from '../repositories/pessoa_repository';
import { Pessoa } from '../models/pessoa_model';

export class PessoaService {
    private pessoaRepository: PessoaRepository;

    constructor() {
        this.pessoaRepository = new PessoaRepository();
    }

    async cadastrarPessoa(pessoa: Pessoa): Promise<Pessoa> {
        if (!pessoa.nome || !pessoa.email) {
            throw new Error('Nome e e-mail são obrigatórios.');
        }

        const pessoaExistente = await this.pessoaRepository.filtrarPessoaEMAIL(pessoa.email);
        if (pessoaExistente) {
            throw new Error('Este e-mail já está cadastrado.');
        }

        return await this.pessoaRepository.inserirPessoa(pessoa);
    }

    async atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
        if (!pessoa.id || !pessoa.nome || !pessoa.email) {
            throw new Error('ID, nome e e-mail são obrigatórios.');
        }

        const pessoaExistente = await this.pessoaRepository.filtrarPessoa(pessoa.id);
        if (!pessoaExistente) {
            throw new Error('Pessoa não encontrada.');
        }

        return await this.pessoaRepository.atualizarPessoa(pessoa);
    }

    async deletarPessoa(id: number): Promise<void> {
        if (!id) {
            throw new Error('ID é obrigatório.');
        }

        const pessoaExistente = await this.pessoaRepository.filtrarPessoa(id);
        if (!pessoaExistente) {
            throw new Error('Pessoa não encontrada.');
        }

        await this.pessoaRepository.deletarPessoa(id);
    }

    async buscarPessoa(id: number): Promise<Pessoa | null> {
        if (!id) {
            throw new Error('ID é obrigatório.');
        }

        return await this.pessoaRepository.filtrarPessoa(id);
    }

    async listarTodasPessoas(): Promise<Pessoa[]> {
        return await this.pessoaRepository.filtrarTODOSPessoa();
    }
}
