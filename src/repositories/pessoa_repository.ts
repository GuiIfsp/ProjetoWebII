import { executarComandoSQL } from "../DATABASE/mysql";
import { Pessoa } from "../models/pessoa_model";

export class PessoaRepository {

    constructor() {
        this.criarTabela();
    }

    private async criarTabela() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela:', err);
        }
    }

    async inserirPessoa(pessoa: Pessoa): Promise<Pessoa> {
        const query = "INSERT INTO biblioteca.Pessoa (nome, email) VALUES (?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email]);
            pessoa.id = resultado.insertId;
            return pessoa;
        } catch (err) {
            console.error('Erro ao inserir pessoa:', err);
            throw err;
        }
    }

    async atualizarPessoa(pessoa: Pessoa): Promise<Pessoa> {
        const query = "UPDATE biblioteca.Pessoa SET nome = ?, email = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [pessoa.nome, pessoa.email, pessoa.id]);
            if (resultado.affectedRows === 0) {
                throw new Error('Nenhuma pessoa atualizada. Verifique se o ID está correto.');
            }
            return pessoa;
        } catch (err) {
            console.error('Erro ao atualizar pessoa:', err);
            throw err;
        }
    }

    async deletarPessoa(id: number): Promise<void> {
        const query = "DELETE FROM biblioteca.Pessoa WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.affectedRows === 0) {
                throw new Error('Nenhuma pessoa deletada. Verifique se o ID está correto.');
            }
        } catch (err) {
            console.error('Erro ao deletar pessoa:', err);
            throw err;
        }
    }

    async filtrarPessoa(id: number): Promise<Pessoa | null> {
        const query = "SELECT * FROM biblioteca.Pessoa WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length === 0) return null;
            return resultado[0];
        } catch (err) {
            console.error('Erro ao buscar pessoa por ID:', err);
            throw err;
        }
    }

    async filtrarTODOSPessoa(): Promise<Pessoa[]> {
        const query = "SELECT * FROM biblioteca.Pessoa";

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado;
        } catch (err) {
            console.error('Erro ao listar todas as pessoas:', err);
            throw err;
        }
    }

    async filtrarPessoaEMAIL(email: string): Promise<Pessoa | null> {
        const query = "SELECT * FROM biblioteca.Pessoa WHERE email = ?";

        try {
            const resultado = await executarComandoSQL(query, [email]);
            if (resultado.length === 0) return null;
            return resultado[0];
        } catch (err) {
            console.error('Erro ao buscar pessoa por e-mail:', err);
            throw err;
        }
    }
}
