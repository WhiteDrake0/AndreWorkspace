class Tag {
    constructor (nome){
        this._id = Tag.getLastId() + 1;
        this._nome = nome;
    }

     // Propriedade ID
     get id() {
        return this._id;
    }

    // Propriedade nome
    get nome() {
        return this._nome;
    }

    set nome(novoValor) {
        this._nome = novoValor;
    }

         // ID automático
         static getLastId() {
            // variaveis
            let lastId = 0;
            let tags = [];

            if (localStorage.getItem("TAGSDef"))
            tags = JSON.parse(localStorage.getItem("TAGSDef"));
    
            if (tags.length != 0) {
                lastId = tags[tags.length-1]._id;
            }
            return lastId;
  
       }
}