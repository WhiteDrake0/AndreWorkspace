class Perfil {
    constructor(nome, email, password, tipo, multa, logIn) {
        this._id = Perfil.getLastId() + 1;
        this._nome = nome;
        this._email = email;
        this._password = password;
        this._tipo = tipo;
        this._multa = multa;
        this._logIn = logIn;

    }

    /**********************
     * GETTERES E SETTERS *
     **********************/

    // Propriedade ID
    get id() {
        return this._id;
    }

    // Propriedade email
    get email() {
        return this._email;
    }

    set email(novoValor) {
        this._email = novoValor;
    }

     // Propriedade password
     get password() {
        return this._password;
    }

    set password(novoValor) {
        this._password = novoValor;
    }

     // Propriedade tipo
     get tipo() {
        return this._tipo;
    }

    set tipo(novoValor) {
        this._tipo = novoValor;
    }

     // Propriedade multa
     get multa() {
        return this._multa;
    }

    set multa(novoValor) {
        this._multa = novoValor;
    }

     // Propriedade logIn
     get logIn() {
        return this._logIn;
    }

    set logIn(novoValor) {
        this._logIn = novoValor;
    }

    /***********
     * MÉTODOS *
     ***********/

     // ID automático
     static getLastId() {
          // variaveis
          let lastId = 0;
          let users = [];
  
          // Se este local storage existir
          if (localStorage.getItem("Utilizadores"))
              users = JSON.parse(localStorage.getItem("Utilizadores"));
  
          if (users.length != 0) {
              lastId = users[users.length - 1].id;
          }
          return lastId;

     }

}