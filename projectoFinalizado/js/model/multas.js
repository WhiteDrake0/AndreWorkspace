class Multa {
    constructor(dias, valor, limite) {
        this._code = Multa.getLastId() + 1;
        this._dias = dias;
        this._valor = valor;
        this._limite = limite;
    }

    // Propriedade code
    get code() {
        return this._code;
    }

    // Propriedade dias
    get dias() {
        return this._dias;
    }

    set dias(novoValor) {
        this._dias = novoValor;
    }

    // Propriedade valor
    get valor() {
        return this._valor;
    }

    set valor(novoValor) {
        this._valor = novoValor;
    }

    // Propriedade limite
    get limite() {
        return this._limite;
    }

    set limite(novoValor) {
        this._limite = novoValor;
    }

    // ID automático
    static getLastId() {
        // variaveis
        let code = "";
        let multas = [];
        let existe = true;
        let codeSopa = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
            "K", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w",
            "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

        if (localStorage.getItem("multas"))
            multas = JSON.parse(localStorage.getItem("multas"));
        
            while (existe) {

            let count = 0;
            code = "";

            for (let i = 0; i < 4; i++) {
                let rdm = Math.round(Math.random() * codeSopa.length);
                code += codeSopa[rdm];
            }


            for (let i = 0; i < multas.length; i++) {

                if (multas[i]._code == code)
                    count++;

            }

            if (count == 0) {
                
                existe = false;
            }
        }

        return code;

    }


}