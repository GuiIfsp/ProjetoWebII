import { executarComandoSQL } from "../DATABASE/mysql";
import { Categoria } from "../models/categoria_model";
import { Livro } from "../models/livro_model";

export class CategoriaRepository {
    constructor() {
        this.criarTabela();
    }

    private async criarTabela() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Categoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error ao criar tabela:', err);
        }
    }

    async inserirCategoria(categoria: Categoria): Promise<Categoria> {
        const query = "INSERT INTO biblioteca.Categoria (nome) VALUES (?)";

        try {
            const resultado = await executarComandoSQL(query, [categoria.nome]);
            console.log('Categoria adicionada com sucesso, ID: ', resultado.insertId);
            categoria.id = resultado.insertId;
            return categoria;
        } catch (err) {
            console.error('Erro ao inserir a categoria:', err);
            throw err;
        }
    }

    async atualizarCategoria(categoria: Categoria): Promise<Categoria> {
        const query = "UPDATE biblioteca.Categoria SET nome = ? WHERE id = ?";

        try {
            await executarComandoSQL(query, [categoria.nome, categoria.id]);
            console.log('Categoria atualizada com sucesso, ID: ', categoria.id);
            return categoria;
        } catch (err) {
            console.error(`Erro ao atualizar a categoria de ID ${categoria.id}: ${err}`);
            throw err;
        }
    }

    async deletarCategoria(categoria: Categoria): Promise<Categoria> {
        const query = "DELETE FROM biblioteca.Categoria WHERE id = ?";

        try {
            await executarComandoSQL(query, [categoria.id]);
            console.log('Categoria deletada com sucesso: ', categoria);
            return categoria;
        } catch (err) {
            console.error(`Falha ao deletar a categoria de ID ${categoria.id}: ${err}`);
            throw err;
        }
    }

    async filtrarCategoria(id: number): Promise<Categoria | null> {
        const query = "SELECT * FROM biblioteca.Categoria WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                return new Categoria(resultado[0].id, resultado[0].nome);
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar a categoria de ID ${id}: ${err}`);
            throw err;
        }
    }

    async filtrarCategoriaNome(nome: string): Promise<Categoria | null> {
        const query = "SELECT * FROM biblioteca.Categoria WHERE nome = ?";
    
        try {
            const resultado = await executarComandoSQL(query, [nome]);
            if (resultado.length > 0) {
                console.log('Categoria encontrada com sucesso, NOME:', nome);
                return new Categoria(resultado[0].id, resultado[0].nome);
            } else {
                return null;
            }
        } catch (err) {
            console.error(`Erro ao buscar a categoria de NOME ${nome}:`, err);
            throw err;
        }
    }
    

    async filtrarTODOSCategoria(): Promise<Categoria[]> {
        const query = "SELECT * FROM biblioteca.Categoria";

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado.map((row: any) => new Categoria(row.id, row.nome));
        } catch (err) {
            console.error(`Falha ao listar as categorias: ${err}`);
            throw err;
        }
    }

    async FiltrarLivroCategoria(idCategoria: number): Promise<Livro[]> {
        const query = "SELECT * FROM Livro WHERE id_categoria = ?";

        try {
            const resultado = await executarComandoSQL(query, [idCategoria]);
            return resultado.map((row: any) => 
                new Livro(row.id, row.titulo, row.autor, row.id_categoria)
            );
        } catch (err) {
            console.error(`Erro ao buscar livros da categoria de ID ${idCategoria}: ${err}`);
            throw err;
        }
    }
}
