window.onload = function init() {
    // variaveis
    let catalgo = [];
    let users = [];
    let comentarios = [];

    // obter refencias do model view
    let titulo = document.getElementById("Title");
    let body = document.getElementById("corpo");
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");
    let listCom = document.getElementById("ListaDeCom");
    let rowComentar = document.getElementById("comentar");

    // alterar nav bar
    function EstadoDeLogIn() {

        let activo = false;
        let id = 0;
        // Lista de utilizadores
        if (localStorage.getItem("Utilizadores"))
            users = JSON.parse(localStorage.getItem("Utilizadores"));



        for (let i = 0; i < users.length; i++) {

            if (users[i]._logIn) {
                activo = true;
                id = i;
            }
        }

        if (activo) {
            optHi.innerHTML = "<a class='nav-link' href='#'>Olá, " +
                users[id].nome + "</a>";
        }

    }

    EstadoDeLogIn();

    //logout
    optLogout.addEventListener('click', function () {
        // Lista de utilizadores
        if (localStorage.getItem("Utilizadores"))
            users = JSON.parse(localStorage.getItem("Utilizadores"));

        // Procurar a user activo
        for (let i = 0; i < users.length; i++) {
            if (users[i]._logIn == true) {
                users[i]._logIn = false;
            }
        }

        // Guardar alteração
        localStorage.setItem("Utilizadores", JSON.stringify(users));

        //actulizar estado de login
        window.location = "\PagInicial.html";
    })

    // iniciar a rendarizassam do catalgo
    renderCatalgo();

    // Registar livro no catalgo
    let guardar = document.getElementById("doar");
    guardar.addEventListener("click", function (event) {

        // Se este local storage existir
        if (localStorage.getItem("Catalgo"))
            catalgo = JSON.parse(localStorage.getItem("Catalgo"));

        // obter valores do formulário do modal Doar livro
        let titulo = document.getElementById("titulo");
        let capa = document.getElementById("capa");
        let autor = document.getElementById("autor");
        let sinopse = document.getElementById("sinopse");
        let dataL = document.getElementById("dataL");
        let tag = document.getElementById("tag");
        let genero = document.getElementById("genero");
        let editora = document.getElementById("editora");
        let npag = document.getElementById("pag");
        let estado = document.getElementById("estado");

        // criar objecto
        let novoLivro = new Livro(titulo.value, capa.value, autor.value, sinopse.value,
            dataL.value, tag.value, genero.value, editora.value,
            npag.value, estado.value);



        // adicionar o novo objecto há array catalgo
        catalgo.push(novoLivro);


        // adiconar ao local storage
        localStorage.setItem("Catalgo", JSON.stringify(catalgo));


        // Fechar modal
        $('#modelId').modal('hide');

        // Renderizar catálogo
        renderCatalgo();

        event.preventDefault();
    });

    //  renderizar catalgo 
    function renderCatalgo() {

        // Se este local storage existir
        if (localStorage.getItem("Catalgo"))
            catalgo = JSON.parse(localStorage.getItem("Catalgo"));

        // Actualizar ID catalgo
        for (let i = 0; i < catalgo.length; i++) {
            catalgo[i]._id = i + 1;
        }
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
                        <h5 class="card-title">${catalgo[i]._titulo}</h5>`

                strHtmlCard += `<a id="${catalgo[i]._id}" class="edit"><i class="fas fa-edit"></i></a>
                                <a id="${catalgo[i]._id}" class="remove"><i class="fas fa-trash-alt"></i></a>
                                <a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`


                strHtmlCard += `</div>
                </div>      
            </div>`

                // Fecha a linha
                if (i % 3 == 2) {
                    strHtmlCard += `</div>`
                }
            }
        }

        // inserir codigo html no catalgo
        let CatalgoDeLivros = document.getElementById("Catalgo");
        CatalgoDeLivros.innerHTML = strHtmlCard;

        // Obter todos os botões REMOVE
        let btnRemove = document.getElementsByClassName("remove");
        for (let i = 0; i < catalgo.length; i++) {
            btnRemove[i].addEventListener("click", function () {
                let Id_livro = catalgo[i]._id;
                removerLivro(Id_livro);
                renderCatalgo();
            })

        }

        // Obter todos as views
        let btnview = document.getElementsByClassName("view");
        for (let i = 0; i < catalgo.length; i++) {
            btnview[i].addEventListener("click", function () {
                let Id_livro = catalgo[i]._id;
                verLivro(Id_livro);
            })

        }

        // Cometar



    }

    // Remover livro
    function removerLivro(id) {

        for (let i = 0; i < catalgo.length; i++) {

            if (catalgo[i]._id == id) {
                catalgo.splice(i, 1);
            }

        }
        // adiconar ao local storage
        localStorage.setItem("Catalgo", JSON.stringify(catalgo));
    }

    // ver detalhes do Livro
    function verLivro(id) {

        // Se este local storage existir
        if (localStorage.getItem("Comentarios"))
            comentarios = JSON.parse(localStorage.getItem("Comentarios"));

        for (let i = 0; i < catalgo.length; i++) {

            // Comparar ids
            if (catalgo[i]._id == id) {
                titulo.innerHTML = catalgo[i]._titulo;
                body.innerHTML = ` <div class = "col-6"> <img id="CoverLivro" class="img-thumbnail" src="${catalgo[i]._capa}" alt=""></div>
               <div class="col-6">
               <p id="AutorLivro"><strong>Autor: </strong>${catalgo[i]._autor}</p>
              
               <p id="TagLivro"><strong>Tags: </strong>${catalgo[i]._tag}</p>
               
               <p id="GeneroLivro"><strong>Género: </strong>${catalgo[i]._genero}</p>
        
               <p id="EditoraLivro"><strong>Editora: </strong>${catalgo[i]._editora}</p>
               
               <p id="NpLivro"><strong>Paginas: </strong>${catalgo[i]._npag}</p>
               
               <p id="EstadoLivro"><strong>Estado: </strong>${catalgo[i]._estado}</p>
               <h5>Sinopse: </h5>
               <p id="SinopseLivro">${catalgo[i]._sinopse}</p>
               </div>`;

                rowComentar.innerHTML = `<div class="form-group col-12">
               <label for="inputPont">Pontuação: </label>
               <span class="fa fa-star checked" id = "Star${catalgo[i]._id}"></span>
               <span class="fa fa-star checked" id = "Star${catalgo[i]._id}"></span>
               <span class="fa fa-star checked" id = "Star${catalgo[i]._id}"></span>
               <span class="fa fa-star checked" id = "Star${catalgo[i]._id}"></span>
               <span class="fa fa-star"></span>
             </div>
             <div class="form-group">
               <label for="inputCom">Comentar: </label>
               <input type="text" class="form-control" id="Com${catalgo[i]._id}">
              <div id="Lista${catalgo[i]._id}">`
                for (let i = 0; i < comentarios.length; i++) {
                    if (comentarios[i]._id_livro == id) {
                        rowComentar.innerHTML += `<label for="">${comentarios[i].getUserName()} </label>
                        <p id="User${comentarios[i]._id_perfil}"><strong>Género: </strong>${comentarios[i]._comentar}</p>`
                    }

                }


                rowComentar.innerHTML += ` </div>
                                          </div>`
            }

        }

        let comentar = document.getElementById("Com" + id);
        comentar.addEventListener('keydown', function (e) {
            if (e.keyCode === 13)
                DeixarComentario(id, comentar.value);

            event.preventDefault();
        })

    } // ver Livro

    function DeixarComentario(id, comenta) {
        console.log("Hello " + id);

        // Se este local storage existir
        if (localStorage.getItem("Comentarios"))
            comentarios = JSON.parse(localStorage.getItem("Comentarios"));

        // variaveis
        let idUser;

        // get id user
        for (let i = 0; i < users.length; i++) {

            if (users[i]._logIn) {
                idUser = users[i]._id;
            }
        }
        // Criar objecto Comentario
        let comentario = new Comentario(idUser, id, comenta, 0);

        // Puxar para a Array
        comentarios.push(comentario);

        // adiconar ao local storage
        localStorage.setItem("Comentarios", JSON.stringify(comentarios));
    }

}

