import { LivroRepository } from '../repositories/livro_repository';
import { CategoriaRepository } from '../repositories/categoria_repository';
import { Livro } from '../models/livro_model';

export class LivroService {
    private livroRepository: LivroRepository;
    private categoriaRepository: CategoriaRepository;

    constructor() {
        this.livroRepository = new LivroRepository();
        this.categoriaRepository = new CategoriaRepository();
    }

    async cadastrarLivro(livro: Livro): Promise<Livro> {
        const categoriaExistente = await this.categoriaRepository.filtrarCategoria(livro.id_categoria);
        if (!categoriaExistente) {
            throw new Error('A categoria associada a este livro não está cadastrada.');
        }
    
        const livroExistente = await this.livroRepository.filtrarLivroTitulo(livro.titulo);
        if (livroExistente) {
            throw new Error('Um livro com o mesmo título já está cadastrado.');
        }
    
        return await this.livroRepository.inserirLivro(livro);
    }    

    async atualizarLivro(livro: Livro): Promise<Livro> {
        const livroExistente = await this.livroRepository.filtrarLivro(livro.id);
        if (!livroExistente) {
            throw new Error('Livro não encontrado.');
        }

        return await this.livroRepository.atualizarLivro(livro);
    }
    async deletarLivro(id: number): Promise<void> {
        const livroExistente = await this.livroRepository.filtrarLivro(id);
        if (!livroExistente) {
            throw new Error('Livro não encontrado.');
        }
    
        await this.livroRepository.deletarLivro(livroExistente);
    }    

    async buscarLivro(id: number): Promise<Livro | null> {
        return await this.livroRepository.filtrarLivro(id);
    }

    async listarTodosLivros(): Promise<Livro[]> {
        return await this.livroRepository.filtrarTODOSLivro();
    }
}
