import { executarComandoSQL } from "../DATABASE/mysql";
import { Usuario } from "../models/usuario_model";

export class UsuarioRepository {
    constructor() {
        this.criarTabela();
    }

    private async criarTabela() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_pessoa INT NOT NULL,
            senha VARCHAR(255) NOT NULL,
            FOREIGN KEY (id_pessoa) REFERENCES biblioteca.Pessoa(id)
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Usuario criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar tabela Usuario:', err);
        }
    }

    async inserirUsuario(usuario: Usuario): Promise<Usuario> {
        const query = "INSERT INTO biblioteca.Usuario (id_pessoa, senha) VALUES (?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [usuario.id_pessoa, usuario.senha]);
            console.log('Usuário adicionado com sucesso, ID:', resultado.insertId);
            usuario.id = resultado.insertId;
            return usuario;
        } catch (err) {
            console.error('Erro ao inserir o usuário:', err);
            throw err;
        }
    }

    async atualizarUsuario(usuario: Usuario): Promise<Usuario> {
        const query = "UPDATE biblioteca.Usuario SET id_pessoa = ?, senha = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.id_pessoa, usuario.senha, usuario.id]);
            console.log('Usuário atualizado com sucesso, ID:', resultado.affectedRows);
            return usuario;
        } catch (err) {
            console.error(`Erro ao atualizar o usuário de ID ${usuario.id}:`, err);
            throw err;
        }
    }

    async deletarUsuario(id: number): Promise<void> {
        const query = "DELETE FROM biblioteca.Usuario WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.affectedRows === 0) {
                throw new Error(`Usuário com ID ${id} não encontrado.`);
            }
            console.log('Usuário deletado com sucesso, ID:', id);
        } catch (err) {
            console.error(`Erro ao deletar o usuário de ID ${id}:`, err);
            throw err;
        }
    }

    async filtrarUsuario(id: number): Promise<Usuario | null> {
        const query = "SELECT * FROM biblioteca.Usuario WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length > 0) {
                console.log('Usuário encontrado, ID:', id);
                return new Usuario(resultado[0].id, resultado[0].id_pessoa, resultado[0].senha);
            } else {
                return null;
            }
        } catch (err) {
            console.error(`Erro ao buscar o usuário de ID ${id}:`, err);
            throw err;
        }
    }

    async listarTodosUsuarios(): Promise<Usuario[]> {
        const query = "SELECT * FROM biblioteca.Usuario";

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Usuários encontrados:', resultado);
            return resultado.map((row: any) => new Usuario(row.id, row.id_pessoa, row.senha));
        } catch (err) {
            console.error('Erro ao listar todos os usuários:', err);
            throw err;
        }
    }
}
