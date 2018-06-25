
//Class livro 
class Livro {
    constructor(titulo, capa, autor, sinopse, dataL, tag,
        genero, editora, npag, estado) {
        this._id = Livro.getLastId() + 1;
        this._titulo = titulo;
        this._capa = capa;
        this._autor = autor;
        this._sinopse = sinopse;
        this._dataL = dataL;
        this._tag = tag;
        this._genero = genero;
        this._editora = editora;
        this._npag = npag;
        this._estado = estado;

    }

    /**********************
     * GETERES E SETTERES *
     **********************/

    // Propriedade Id
    get id() {
        return this._id;
    }

    // Propriedade titulo
    get titulo() {
        return this._titulo;
    }

    set titulo(novoValor) {
        this._titulo = novoValor;
    }

    // Propriedade capa
    get capa() {
        return this._capa;
    }

    set capa(novoValor) {
        this._capa = novoValor;
    }

    // Propriedade autor
    get autor() {
        return this._autor;
    }

    set autor(novoValor) {
        this._autor = novoValor;
    }

    // Propriedade sinopse
    get sinopse() {
        return this._sinopse;
    }

    set sinopse(novoValor) {
        this._sinopse = novoValor;
    }

    // Propriedade dataL
    get dataL() {
        return this._dataL;
    }

    set dataL(novoValor) {
        this._dataL = novoValor;
    }

    // Propriedade tag
    get tag() {
        return this._tag;
    }

    set tag(novoValor) {
        this._tag = novoValor;
    }

    // Propriedade genero
    get genero() {
        return this._genero;
    }

    set genero(novoValor) {
        this._genero = novoValor;
    }

    // Propriedade editora
    get editora() {
        return this._editora;
    }

    set editora(novoValor) {
        this._editora = novoValor;
    }

    // Propriedade npag
    get npag() {
        return this._npag;
    }

    set npag(novoValor) {
        this._npag = novoValor;
    }

    // Propriedade estado
    get estado() {
        return this._estado;
    }

    set estado(novoValor) {
        this._estado = novoValor;
    }

    /***********
     * MÉTODOS *
     ***********/

    static getLastId() {

        // variaveis
        let lastId = 0
        let catalgo = [];

        // Se este local storage existir
        if (localStorage.getItem("Catalgo"))
            catalgo = JSON.parse(localStorage.getItem("Catalgo"));

        if (catalgo.length != 0) {
            lastId = catalgo[catalgo.length - 1]._id
        }
        
        return lastId
    }
}