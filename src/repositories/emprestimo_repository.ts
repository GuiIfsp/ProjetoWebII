import { executarComandoSQL } from "../DATABASE/mysql";
import { Emprestimo } from "../models/emprestimo_model";

export class EmprestimoRepository {

    constructor() {
        this.criarTabela();
    }

    private async criarTabela() {
        const query = `
        CREATE TABLE IF NOT EXISTS Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_livro INT NOT NULL,
            id_usuario INT NOT NULL,
            data_emprestimo DATE NOT NULL,
            data_devolucao DATE NOT NULL,
            FOREIGN KEY (id_livro) REFERENCES Livro(id),
            FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
        )`;

        try {
            await executarComandoSQL(query, []);
            console.log('Tabela Emprestimo criada com sucesso ou já existe.');
        } catch (err) {
            console.error('Erro ao criar a tabela Emprestimo:', err);
        }
    }

    async inserirEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
        const query = `
        INSERT INTO Emprestimo (id_livro, id_usuario, data_emprestimo, data_devolucao)
        VALUES (?, ?, ?, ?)
        `;

        try {
            const resultado = await executarComandoSQL(query, [
                emprestimo.id_livro, 
                emprestimo.id_usuario, 
                emprestimo.data_emprestimo, 
                emprestimo.data_devolucao
            ]);
            emprestimo.id = resultado.insertId;
            console.log('Empréstimo adicionado com sucesso, ID: ', emprestimo.id);
            return emprestimo;
        } catch (err) {
            console.error('Erro ao inserir o empréstimo:', err);
            throw err;
        }
    }

    async atualizarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
        const query = `
        UPDATE Emprestimo 
        SET id_livro = ?, id_usuario = ?, data_emprestimo = ?, data_devolucao = ?
        WHERE id = ?
        `;

        try {
            await executarComandoSQL(query, [
                emprestimo.id_livro, 
                emprestimo.id_usuario, 
                emprestimo.data_emprestimo, 
                emprestimo.data_devolucao, 
                emprestimo.id
            ]);
            console.log('Empréstimo atualizado com sucesso, ID: ', emprestimo.id);
            return emprestimo;
        } catch (err) {
            console.error(`Erro ao atualizar o empréstimo de ID ${emprestimo.id}:`, err);
            throw err;
        }
    }

    async deletarEmprestimo(id: number): Promise<void> {
        const query = "DELETE FROM Emprestimo WHERE id = ?";

        try {
            await executarComandoSQL(query, [id]);
            console.log('Empréstimo deletado com sucesso, ID: ', id);
        } catch (err) {
            console.error(`Falha ao deletar o empréstimo de ID ${id}:`, err);
            throw err;
        }
    }

    async filtrarEmprestimo(id: number): Promise<Emprestimo | null> {
        const query = "SELECT * FROM Emprestimo WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                const { id, id_livro, id_usuario, data_emprestimo, data_devolucao } = resultado[0];
                return new Emprestimo(id, id_livro, id_usuario, new Date(data_emprestimo), new Date(data_devolucao));
            }
            return null;
        } catch (err) {
            console.error(`Falha ao procurar o empréstimo de ID ${id}:`, err);
            throw err;
        }
    }

    async filtrarTODOSEmprestimo(): Promise<Emprestimo[]> {
        const query = "SELECT * FROM Emprestimo";

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado.map((row: any) => 
                new Emprestimo(
                    row.id, 
                    row.id_livro, 
                    row.id_usuario, 
                    new Date(row.data_emprestimo), 
                    new Date(row.data_devolucao)
                )
            );
        } catch (err) {
            console.error('Falha ao listar os empréstimos:', err);
            throw err;
        }
    }
}
