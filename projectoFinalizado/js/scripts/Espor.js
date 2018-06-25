
//Arreys e variaveis
let catalgo = [];
let users = [];
let activo = false;

// Lista de utilizadores
if (localStorage.getItem("Utilizadores"))
    users = JSON.parse(localStorage.getItem("Utilizadores"));

// Lista de comentarios
if (localStorage.getItem("Catalgo"))
    catalgo = JSON.parse(localStorage.getItem("Catalgo"));

// Lista comentarios
if (localStorage.getItem("Comentarios"))
    comentarios = JSON.parse(localStorage.getItem("Comentarios"));



//Adicionar html á form
function livrosRecentes(frmRecent) {


    // Procurar utilizador activo
    for (let i = 0; i > users.length; i++) {

        if (users[i]._logIn) {
            activo = true;
        }
    }

    // Codigo a adicionar ao html
    let strHtmlCard = "";
    if (catalgo.length > 0) {
        for (var i = catalgo.length - 1; i >= 0; i--) {

            

            if (i > catalgo.length - 5)
            strHtmlCard += `<div class="col-sm-4">
            <div class="card" style="width: 13rem;">
                <img class="card-img-top" src="${catalgo[i]._capa}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${catalgo[i]._titulo}</h5>
                    <p class="card-text">${catalgo[i]._autor}</p>`


            strHtmlCard += `</div>
                </div>      
             </div>`


        }

        frmRecent.innerHTML = strHtmlCard;
    }
}

