export class Emprestimo {
    constructor(
      public id: number,
      public id_livro: number,
      public id_usuario: number,
      public data_emprestimo: Date,
      public data_devolucao: Date
    ) {}
  }
  