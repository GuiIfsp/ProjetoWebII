import mysql from 'mysql2/promise';

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'ifsp',
    database: 'biblioteca'
};

export async function executarComandoSQL(query: string, params: any[] = []): Promise<any> {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);

        const [results] = await connection.execute(query, params);

        return results;
    } catch (err) {
        console.error('Erro ao executar comando SQL:', err);
        throw err;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}
