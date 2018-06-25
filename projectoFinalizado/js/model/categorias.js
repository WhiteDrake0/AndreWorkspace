class Categoria {
    constructor (nome){
        this._id = Categoria.getLastId() + 1;
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
            let Categorias = [];
  
            if (localStorage.getItem("Categorias"))
            Categorias = JSON.parse(localStorage.getItem("Categorias"));
    
    
            if (Categorias.length != 0) {
                lastId = Categorias[Categorias.length-1]._id;
            }
            return lastId;
  
       }
}