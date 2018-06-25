class Biblioteca {
    constructor(freguesia, morada, capacidade, livros, gps) {
        this._code = Biblioteca.getLastId() + 1;
        this._freguesia = freguesia;
        this._morada = morada;
        this._capacidade = capacidade;
        this._livros = livros;
        this._gps = gps;
    }

    /**********************
     * GETTERS E SETTERES *
     **********************/

    // Propriedade Id
    get code() {
        return this._code;
    }

    // Propriedade freguesia
    get freguesia() {
        this._freguesia;
    }

    set freguesia(novoValor) {
        this._freguesia = novoValor;
    }

    // Propriedade morada
    get morada() {
        this._morada;
    }

    set morada(novoValor) {
        this._morada = novoValor;
    }

    // Propriedade capacidade
    get capacidade() {
        this._capacidade;
    }

    set capacidade(novoValor) {
        this._capacidade = novoValor;
    }

    // Propriedade livros
    get livros() {
        this._livros;
    }

    set livros(novoValor) {
        this._livros = novoValor;
    }

    // Propriedade gps
    get gps() {
        this._gps;
    }

    set gps(novoValor) {
        this._gps = novoValor;
    }

    /***********
     * MÈTODOS *
     ***********/

    static getLastId() {
        // variaveis
        let code = "";
        let Bibliotecas = [];
        let existe = true;
        let codeSopa = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "K", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
            "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]


        // Se este local storage existir
        if (localStorage.getItem("Bibliotecas"))
            Bibliotecas = JSON.parse(localStorage.getItem("Bibliotecas"));

            while (existe) {

                let count = 0;
                code = "";
        
                for (let i = 0; i < 4; i++) {
                    let rdm = Math.round(Math.random() * codeSopa.length);
                    code += codeSopa[rdm];
                }
    
    
                for (let i = 0; i < Bibliotecas.length; i++) {
    
                    if (Bibliotecas[i]._code == code)
                        count++;
    
                }
    
                if (count == 0) {
                    
                    existe = false;
                }
            }
            
        return code
    }

}