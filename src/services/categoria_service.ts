import { CategoriaRepository } from '../repositories/categoria_repository';
import { Categoria } from '../models/categoria_model';

export class CategoriaService {
    private categoriaRepository: CategoriaRepository;

    constructor() {
        this.categoriaRepository = new CategoriaRepository();
    }

    async cadastrarCategoria(categoria: Categoria): Promise<Categoria> {
        const categoriaExistente = await this.categoriaRepository.filtrarCategoriaNome(categoria.nome);
        if (categoriaExistente) {
            throw new Error('Já existe uma categoria com este nome.');
        }
    
        return await this.categoriaRepository.inserirCategoria(categoria);
    }    

    async atualizarCategoria(categoria: Categoria): Promise<Categoria> {
        const categoriaExistente = await this.categoriaRepository.filtrarCategoria(categoria.id);
        if (!categoriaExistente) {
            throw new Error('Categoria não encontrada.');
        }

        return await this.categoriaRepository.atualizarCategoria(categoria);
    }

    async deletarCategoria(id: number): Promise<void> {
        const categoriaExistente = await this.categoriaRepository.filtrarCategoria(id);
        if (!categoriaExistente) {
            throw new Error('Categoria não encontrada.');
        }

        await this.categoriaRepository.deletarCategoria(categoriaExistente);
    }

    async buscarCategoria(id: number): Promise<Categoria | null> {
        return await this.categoriaRepository.filtrarCategoria(id);
    }

    async listarTodasCategorias(): Promise<Categoria[]> {
        return await this.categoriaRepository.filtrarTODOSCategoria();
    }

    async buscarLivrosPorCategoria(idCategoria: number): Promise<any[]> {
        return await this.categoriaRepository.FiltrarLivroCategoria(idCategoria);
    }
}
