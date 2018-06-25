
    //Arreys e variaveis
    let catalgo = [];
    let users = [];
    let activo = false;

    //Adicionar html á form
    function livrosRecentes(frmRecent) {
        console.log("Hello world")
        // Lista de utilizadores
        if (localStorage.getItem("Utilizadores"))
            users = JSON.parse(localStorage.getItem("Utilizadores"));


        // Procurar utilizador activo
        for (let i = 0; i < users.length; i++) {

            if (users[i]._logIn) {
                activo = true;
            }
        }

        // Se este local storage existir
        if (localStorage.getItem("Catalgo"))
            catalgo = JSON.parse(localStorage.getItem("Catalgo"));

        // Codigo a adicionar ao html
        let strHtmlCard = "";
        if (catalgo.length > 0) {
            for (var i = 0; i < catalgo.length; i++) {

                // Inicia a linha
                if (i % 3 == 0) {
                    strHtmlCard += `<div class="row">`;
                }

                // Cria a card
                strHtmlCard += `<div class="col-sm-4">
                <div class="card" style="width: 13rem;">
                    <img class="card-img-top" src="${catalgo[i]._capa}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${catalgo[i]._titulo}</h5>
                        <p class="card-text">${catalgo[i]._sinopse}</p>`

               /* if (activo) {
                    strHtmlCard += `<a id="${catalgo[i]._id}" class="edit"><i class="fas fa-edit"></i></a>
                                <a id="${catalgo[i]._id}" class="remove"><i class="fas fa-trash-alt"></i></a>
                                <a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`
                }*/


                strHtmlCard += `</div>
                </div>      
             </div>`

                // Fecha a linha
                if (i % 3 == 2) {
                    strHtmlCard += `</div>`
                }

            }

            frmRecent.innerHTML = strHtmlCard;
        }
    }