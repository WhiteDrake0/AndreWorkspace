class Comentario {
    constructor(id_perfil, id_livro, comentar, pontuacao) {
        this._id = Livro.getLastId() + 1;
        this._id_perfil = id_perfil;
        this._id_livro = id_livro;
        this._comentar = comentar;
        this._pontuacao = pontuacao;
    }

    /**********************
     * GETTERS E SETTERES *
     **********************/

    // Propriedade Id
    get id() {
        return this._id;
    }

    // Propriedade id_perfil
    get id_perfil() {
        this._id_perfil;
    }

    set id_perfil(novoValor) {
        this._id_livro = novoValor;
    }

    // Propriedade id_livro
    get id_livro() {
        this._id_livro;
    }

    set id_livro(novoValor) {
        this._id_livro = novoValor;
    }

    // Propriedade comentar
    get comentar() {
        this._comentar;
    }

    set comentar(novoValor) {
        this._comentar = novoValor;
    }

    // Propriedade pontuacao
    get pontuacao() {
        this._pontuacao;
    }

    set pontuacao(novoValor) {
        this._pontuacao = novoValor;
    }

    /***********
     * MÈTODOS *
     ***********/

    static getLastId() {
        // variaveis
        let lastId = 0
        let comentarios = [];

        // Se este local storage existir
        if (localStorage.getItem("Comentarios"))
            comentarios = JSON.parse(localStorage.getItem("Comentarios"));

        if (comentarios.length != 0) {
            lastId = catalgo[comentarios.length - 1]._id
        }

        return lastId
    }

}

Comentario.prototype.getUserName = function () {
    // Lista de utilizadores
    if (localStorage.getItem("Utilizadores"))
        var users = JSON.parse(localStorage.getItem("Utilizadores"));

    var resposta = "";

    // Pocorrer lista
    for (let i = 0; i < users.length; i++) {

        if (users[i]._id == this._id_perfil) {
            resposta = users[i].nome;
        }
    }

    return resposta;
}