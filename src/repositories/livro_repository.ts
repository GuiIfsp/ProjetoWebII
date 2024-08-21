import { executarComandoSQL } from "../DATABASE/mysql";
import { Livro } from "../models/livro_model";

export class LivroRepository {

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            id_categoria INT,
            FOREIGN KEY (id_categoria) REFERENCES biblioteca.Categoria(id)
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Livro criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela Livro:', err);
        }
    }

    async inserirLivro(livro: Livro): Promise<Livro> {
        const query = "INSERT INTO biblioteca.Livro (titulo, autor, id_categoria) VALUES (?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.id_categoria]);
            console.log('Livro adicionado com sucesso, ID:', resultado.insertId);
            livro.id = resultado.insertId;
            return livro;
        } catch (err) {
            console.error('Erro ao inserir o livro:', err);
            throw err;
        }
    }

    async atualizarLivro(livro: Livro): Promise<Livro> {
        const query = "UPDATE biblioteca.Livro SET titulo = ?, autor = ?, id_categoria = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [livro.titulo, livro.autor, livro.id_categoria, livro.id]);
            console.log('Livro atualizado com sucesso, ID:', resultado.affectedRows);
            return livro;
        } catch (err) {
            console.error(`Erro ao atualizar o livro de ID ${livro.id}:`, err);
            throw err;
        }
    }

    async deletarLivro(livro: Livro): Promise<Livro> {
        const query = "DELETE FROM biblioteca.Livro WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [livro.id]);
            console.log('Livro deletado com sucesso, ID:', livro.id);
            return livro;
        } catch (err) {
            console.error(`Erro ao deletar o livro de ID ${livro.id}:`, err);
            throw err;
        }
    }

    async filtrarLivro(id: number): Promise<Livro> {
        const query = "SELECT * FROM biblioteca.Livro WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                console.log('Livro encontrado, ID:', id);
                return new Livro(resultado[0].id, resultado[0].titulo, resultado[0].autor, resultado[0].id_categoria);
            } else {
                throw new Error(`Livro com ID ${id} não encontrado`);
            }
        } catch (err) {
            console.error(`Erro ao buscar o livro de ID ${id}:`, err);
            throw err;
        }
    }

    async filtrarLivroTitulo(titulo: string): Promise<Livro | null> {
        const query = "SELECT * FROM biblioteca.Livro WHERE titulo = ?";
    
        try {
            const resultado = await executarComandoSQL(query, [titulo]);
            if (resultado.length > 0) {
                console.log('Livro encontrado, titulo:', titulo);
                return new Livro(resultado[0].id, resultado[0].titulo, resultado[0].autor, resultado[0].id_categoria);
            } else {
                return null;
            }
        } catch (err) {
            console.error(`Erro ao buscar o livro de titulo ${titulo}:`, err);
            throw err;
        }
    }    

    async filtrarTODOSLivro(): Promise<Livro[]> {
        const query = "SELECT * FROM biblioteca.Livro";

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Livros encontrados:', resultado);
            return resultado.map((row: any) => new Livro(row.id, row.titulo, row.autor, row.id_categoria));
        } catch (err) {
            console.error('Erro ao listar todos os livros:', err);
            throw err;
        }
    }
}
