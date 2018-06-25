
//Class Requisitar
class Requisitar {
    constructor(id_perfil, id_livro, data_requesicao, estado_Requesito) {
        this._id = Requisitar.getLastId() + 1;
        this._id_perfil = id_perfil;
        this._id_livro = id_livro;
        this._data_requesicao = data_requesicao;
        this._data_entrega = Requisitar.getdata_entrega();
        this._estado_Requesito = estado_Requesito;

    }

    /**********************
     * GETERES E SETTERES *
     **********************/

    // Propriedade Id
    get id() {
        return this._id;
    }

    // Propriedade id_perfil
    get id_perfil() {
        return this._id_perfil;
    }

    set id_perfil(novoValor) {
        this._id_perfil = novoValor;
    }

    // Propriedade id_livro
    get id_livro() {
        return this._id_livro;
    }

    set id_livro(novoValor) {
        this._id_livro = novoValor;
    }

    // Propriedade data_requesicao
    get data_requesicao() {
        return this._data_requesicao;
    }

    set data_requesicao(novoValor) {
        this._data_requesicao = novoValor;
    }

    // Propriedade estado_Requesito
    get estado_Requesito() {
        return this._estado_Requesito;
    }

    set estado_Requesito(novoValor) {
        this._estado_Requesito = novoValor;
    }


    /***********
     * MÉTODOS *
     ***********/

    static getLastId() {

        // variaveis
        let lastId = 0
        let requesitos = [];

        // Se este local storage existir
        if (localStorage.getItem("Requesitos"))
            requesitos = JSON.parse(localStorage.getItem("Requesitos"));

        if (requesitos.length != 0) {
            lastId = catalgo[requesitos.length - 1]._id
        }

        return lastId
    }

    static getdata_entrega() {
        
        console.log("Hello world")
        let ano = new Date().getFullYear();
        let mes = new Date().getMonth() + 1;
        let dia = new Date().getDate();
        
        if(localStorage.getItem("multas")){
            let data = new Date();
            let multas = localStorage.getItem("multas");
            
            data.setDate(data + multas._dias);

            ano = data.getFullYear();
            mes =data.getMonth()+1;
            dia = data.getDate();

            return ano + "-" + mes + "-" + dia;

            
        }

        return ano + "-" + mes + "-" + dia;
    }
}