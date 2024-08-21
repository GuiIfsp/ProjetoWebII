import express from 'express';
import { 
    adicionarEmprestimo, 
    atualizarEmprestimo, 
    deletarEmprestimo, 
    buscarEmprestimo, 
    listarTodosEmprestimos 
} from './controllers/emprestimo_controller';
import { 
    cadastrarLivro, 
    atualizarLivro, 
    deletarLivro, 
    buscarLivro, 
    listarTodosLivros 
} from './controllers/livro_controller';
import { 
    cadastrarUsuario, 
    atualizarUsuario, 
    deletarUsuario, 
    buscarUsuario, 
    listarTodosUsuarios 
} from './controllers/usuario_controller';
import { 
    cadastrarCategoria, 
    atualizarCategoria, 
    deletarCategoria, 
    buscarCategoria, 
    listarTodasCategorias, 
    buscarLivrosPorCategoria 
} from './controllers/categoria_controller';
import { 
    cadastrarPessoa, 
    atualizarPessoa, 
    deletarPessoa, 
    buscarPessoa, 
    listarTodasPessoas 
} from './controllers/pessoa_controller';

const app = express();
const PORT = 3040;

app.use(express.json());

app.post("/api/emprestimo", adicionarEmprestimo);
app.put("/api/emprestimo", atualizarEmprestimo);
app.delete("/api/emprestimo/:id", deletarEmprestimo);
app.get("/api/emprestimo/:id", buscarEmprestimo);
app.get("/api/emprestimo", listarTodosEmprestimos);

app.post("/api/livro", cadastrarLivro);
app.put("/api/livro", atualizarLivro);
app.delete("/api/livro/:id", deletarLivro);
app.get("/api/livro/:id", buscarLivro);
app.get("/api/livro", listarTodosLivros);

app.post("/api/usuario", cadastrarUsuario);
app.put("/api/usuario", atualizarUsuario);
app.delete("/api/usuario/:id", deletarUsuario);
app.get("/api/usuario/:id", buscarUsuario);
app.get("/api/usuario", listarTodosUsuarios);

app.post("/api/categoria", cadastrarCategoria);
app.put('api/categorias/:id', atualizarCategoria);
app.delete("/api/categoria/:id", deletarCategoria);
app.get("/api/categoria/:id", buscarCategoria);
app.get("/api/categoria", listarTodasCategorias);
app.get("/api/categoria/:id/livros", buscarLivrosPorCategoria);

app.post("/api/pessoa", cadastrarPessoa);
app.put("/api/pessoa", atualizarPessoa);
app.delete("/api/pessoa/:id", deletarPessoa);
app.get("/api/pessoa/:id", buscarPessoa);
app.get("/api/pessoa", listarTodasPessoas);

app.listen(PORT, () => console.log(`API online na porta: ${PORT}`));
