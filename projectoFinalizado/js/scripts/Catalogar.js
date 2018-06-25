window.onload = function init() {
    // variaveis
    let bibliotecas = [];
    let catalgo = [];
    let users = [];
    let comentarios = [];
    let requesitos = [];
    let tags = [];
    let categorias = [];
    let Id_livro;
    let tipo = 2;

    // obter refencias do model view
    let titulo = document.getElementById("Title");
    let body = document.getElementById("corpo");
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");
    let tag = document.getElementById("tag");
    let genero = document.getElementById("genero");
    let tag2 = document.getElementById("tag2");
    let genero2 = document.getElementById("genero2");
    let opAdmin = document.getElementById("opAdmin");
    let opLevantamento = document.getElementById("opLevantamento");
    let btnDoar = document.getElementById("btnDoar");
    let FiltroTag = document.getElementById("FiltroTag");
    let FiltroCategoria = document.getElementById("FiltroCategoria");
    let Filtrar = document.getElementById("btnfiltrar");

    // Esconder opções de quem não está com a conta ativa
    optLogout.style.display = 'none';
    optHi.style.display = 'none';
    opLevantamento.style.display = 'none';
    opAdmin.style.display = 'none';
    if (tipo != 1)
        btnDoar.style.display = 'none';


    // Lista comentarios
    if (localStorage.getItem("Comentarios"))
        comentarios = JSON.parse(localStorage.getItem("Comentarios"));

    // Lista de utilizadores
    if (localStorage.getItem("Utilizadores"))
        users = JSON.parse(localStorage.getItem("Utilizadores"));

    // Lista de livros
    if (localStorage.getItem("Catalgo"))
        catalgo = JSON.parse(localStorage.getItem("Catalgo"));

    // lista de requesitos
    if (localStorage.getItem("Requesitos"))
        requesitos = JSON.parse(localStorage.getItem("Requesitos"));

    if (localStorage.getItem("TAGSDef"))
        tags = JSON.parse(localStorage.getItem("TAGSDef"));

    if (localStorage.getItem("Categorias"))
        Categorias = JSON.parse(localStorage.getItem("Categorias"));

    // Se o localStorage existir
    if (localStorage.getItem("Bibliotecas"))
        bibliotecas = JSON.parse(localStorage.getItem("Bibliotecas"));

    // Adicionar tags
    FiltroTag.innerHTML += `<option class="FiltroT" value="">escolhe</option>`
    for (let i = 0; i < tags.length; i++) {

        tag.innerHTML += `<option value="${tags[i]._nome}">${tags[i]._nome}</option>`
        tag2.innerHTML += `<option value="${tags[i]._nome}">${tags[i]._nome}</option>`
        FiltroTag.innerHTML += `<option class="FiltroT" value="${tags[i]._nome}">${tags[i]._nome}</option>`
    }

    // Adicionar categorias
    FiltroCategoria.innerHTML += `<option class="FiltroT" value="">escolhe</option>`
    for (let i = 0; i < Categorias.length; i++) {

        genero.innerHTML += `<option value="${Categorias[i]._nome}">${Categorias[i]._nome}</option>`
        genero2.innerHTML += `<option value="${Categorias[i]._nome}">${Categorias[i]._nome}</option>`
        FiltroCategoria.innerHTML += `<option class="FiltroC" value="${Categorias[i]._nome}">${Categorias[i]._nome}</option>`

    }

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
                tipo = users[i]._tipo;
            }
        }

        if (activo) {
            // Alterar nav bar 
            optLogout.style.display = 'block';

            optHi.innerHTML = "<a class='nav-link' href='#'>Olá, " +
                users[id]._nome + "</a>";
            optHi.style.display = 'block';

            if (tipo < 2)
                opLevantamento.style.display = 'block';

            if (tipo == 0)
                opAdmin.style.display = 'block';
        }

    }

    EstadoDeLogIn();


    //logout
    optLogout.addEventListener('click', function () {

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

    Filtrar.addEventListener("click", function () {
        renderCatalgo(FiltroTag.value, FiltroCategoria.value);
    })

    // iniciar a rendarizassam do catalgo
    renderCatalgo("", "");

    // Registar livro no catalgo
    let guardar = document.getElementById("doar");

    guardar.addEventListener("click", function (event) {


        // obter valores do formulário do modal Doar livro
        let titulo = document.getElementById("titulo");
        let capa = document.getElementById("capa");
        let autor = document.getElementById("autor");
        let sinopse = document.getElementById("sinopse");
        let dataL = document.getElementById("dataL");
        let editora = document.getElementById("editora");
        let npag = document.getElementById("pag");
        let estado = document.getElementById("estado");

        // criar objecto
        let novoLivro = new Livro(titulo.value, capa.value, autor.value, sinopse.value,
            dataL.value, tag.value, genero.value, editora.value,
            npag.value, estado.value);

        let biblioteca = prompt("Escreva o nome da freguesia da biblioteca: ")

        let existe = false;
        let cheio = true;
        for (let i = 0; i < bibliotecas.length; i++) {

            if (bibliotecas[i]._freguesia == biblioteca) {
                existe = true;

                if (parseInt(bibliotecas[i]._capacidade) > bibliotecas[i]._livros.length) {

                    cheio = false;
                    bibliotecas[i]._livros.push(novoLivro._id);
                }
            }

        }
        // adicionar o novo objecto há array catalgo
        if (existe) {
            if (!cheio) {
                catalgo.push(novoLivro);
            } else alert("A biblioteca está cheia");
        }
        else
            alert("Essa biblioteca não existe");


        // adiconar ao local storage
        localStorage.setItem("Catalgo", JSON.stringify(catalgo));
        localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));


        // Fechar modal
        $('#modelId').modal('hide');

        // Renderizar catálogo
        renderCatalgo(FiltroTag.value, FiltroCategori.value);;

        event.preventDefault();
    });

    //  renderizar catalgo --------------------------------------------------------------------------------------------------------------
    function renderCatalgo(tagfiltro, categoriafiltro) {

        // Actualizar ID catalgo
        for (let i = 0; i < catalgo.length; i++) {
            catalgo[i]._id = i + 1;
        }
        // Codigo a adicionar ao html
        let strHtmlCard = "";

        for (var i = 0; i < catalgo.length; i++) {
            if (tagfiltro == catalgo[i]._tag) {
                if (categoriafiltro == catalgo[i]._genero) {
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

                    if (tipo == 1)
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                        <a id="${catalgo[i]._id}" class="remove"><i class="fas fa-trash-alt"></i></a>
                        <a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`
                    else
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`

                    strHtmlCard += `</div>
                                     </div>      
                                       </div>`

                    // Fecha a linha
                    if (i % 3 == 2) {
                        strHtmlCard += `</div>`
                    }
                }

                if (categoriafiltro == "") {
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

                    if (tipo == 1)
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                        <a id="${catalgo[i]._id}" class="remove"><i class="fas fa-trash-alt"></i></a>
                        <a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`
                    else
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`

                    strHtmlCard += `</div>
                                     </div>      
                                       </div>`

                    // Fecha a linha
                    if (i % 3 == 2) {
                        strHtmlCard += `</div>`
                    }
                }
            }

            if (tagfiltro == "") {
                if (categoriafiltro == catalgo[i]._genero) {
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

                    if (tipo == 1)
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                        <a id="${catalgo[i]._id}" class="remove"><i class="fas fa-trash-alt"></i></a>
                        <a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`
                    else
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`

                    strHtmlCard += `</div>
                                     </div>      
                                       </div>`

                    // Fecha a linha
                    if (i % 3 == 2) {
                        strHtmlCard += `</div>`
                    }
                }

                if (categoriafiltro == "") {
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

                    if (tipo == 1)
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                        <a id="${catalgo[i]._id}" class="remove"><i class="fas fa-trash-alt"></i></a>
                        <a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`
                    else
                        strHtmlCard += `<a id="${catalgo[i]._id}" class="view" data-toggle="modal" data-target="#ModalLivro"><i class="fas fa-eye"></i></a>`

                    strHtmlCard += `</div>
                                     </div>      
                                       </div>`

                    // Fecha a linha
                    if (i % 3 == 2) {
                        strHtmlCard += `</div>`
                    }
                }
            }

        }


        // inserir codigo html no catalgo
        let CatalgoDeLivros = document.getElementById("Catalgo");
        CatalgoDeLivros.innerHTML = strHtmlCard;

        // Obter todos os botões REMOVE
        if (document.getElementsByClassName("remove")) {
            let btnRemove = document.getElementsByClassName("remove");
            for (let i = 0; i < btnRemove.length; i++) {
                btnRemove[i].addEventListener("click", function () {
                    let Id = btnRemove[i].getAttribute("id");
                    removerLivro(Id);
                    renderCatalgo(FiltroTag.value, FiltroCategori.value);;
                })

            }
        }

        // Obter todos as views
        if (document.getElementsByClassName("view")) {
            let btnview = document.getElementsByClassName("view");
            for (let i = 0; i < btnview.length; i++) {
                btnview[i].addEventListener("click", function () {
                    let Id = btnview[i].getAttribute("id");
                    verLivro(Id);
                })

            }
        }

        // Obter todos as views
        if (document.getElementsByClassName("edit")) {
            let btnEdit = document.getElementsByClassName("edit");
            for (let i = 0; i < btnEdit.length; i++) {
                btnEdit[i].addEventListener("click", function () {
                    Id_livro = btnEdit[i].getAttribute("id");;
                    EditLivro(Id_livro);
                })

            }
        }

    }

    //Editar Livro
    function EditLivro(id) {
        // obter valores do formulário do modal Doar livro
        for (let i = 0; i < catalgo.length; i++) {
            if (catalgo[i]._id == id) {
                document.getElementById("titulo2").value = catalgo[i]._titulo;
                document.getElementById("capa2").value = catalgo[i]._capa;
                document.getElementById("autor2").value = catalgo[i]._autor;
                document.getElementById("sinopse2").value = catalgo[i]._sinopse;
                document.getElementById("dataL2").value = catalgo[i]._dataL;
                document.getElementById("editora2").value = catalgo[i]._editora;
                document.getElementById("pag2").value = catalgo[i]._npag;
                document.getElementById("estado2").value = catalgo[i]._estado;
                genero2.value = catalgo[i]._genero;
                tag2.value = catalgo[i]._tag;
            }

        }
    }

    // Concluir edit
    let alterar = document.getElementById("Alterar");
    alterar.addEventListener("click", function () {

        // Subestituir valores
        for (let i = 0; i < catalgo.length; i++) {
            if (catalgo[i]._id == Id_livro) {
                catalgo[i]._titulo = document.getElementById("titulo2").value;
                catalgo[i]._capa = document.getElementById("capa2").value;
                catalgo[i]._autor = document.getElementById("autor2").value;
                catalgo[i]._sinopse = document.getElementById("sinopse2").value;
                catalgo[i]._dataL = document.getElementById("dataL2").value;
                catalgo[i]._editora = document.getElementById("editora2").value;
                catalgo[i]._npag = document.getElementById("pag2").value;
                catalgo[i]._estado = document.getElementById("estado2").value;
                catalgo[i]._genero = genero2.value;
                catalgo[i]._tag = tag2.value;
            }
        }

        // Guardar 
        localStorage.setItem("Catalgo", JSON.stringify(catalgo));


        // Fechar modal
        $('#modelEdit').modal('hide');

        // Renderizar catálogo
        renderCatalgo(FiltroTag.value, FiltroCategori.value);;
    })

    // Remover livro
    function removerLivro(id) {

        for (let i = 0; i < catalgo.length; i++) {

            if (catalgo[i]._id == id) {
                catalgo.splice(i, 1);

                for (let z = 0; z < bibliotecas.length; z++) {
                    for (let j = 0; j < bibliotecas[z]._livros.length; j++) {
                        if (bibliotecas[z]._livros[j] == id) {
                            bibliotecas[z]._livros.splice(j, 1);
                            localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));
                        }

                    }
                }

                for (let z = 0; z < comentarios.length; z++) {

                    if (comentarios[z]._id_livro == id) {
                        comentarios.splice(z, 1);
                        localStorage.setItem("Comentarios", JSON.stringify(comentarios));
                    }


                }
            }

        }
        // adiconar ao local storage
        localStorage.setItem("Catalgo", JSON.stringify(catalgo));
    }

    function Media(id) {
        let media = 0;
        let divisor = 0;
        for (let i = 0; i < comentarios.length; i++) {
            if (comentarios[i]._pontuacao != -1 && id == comentarios[i]._id_livro) {

                media += comentarios[i]._pontuacao
                divisor++;
            }
        }

        if (divisor != 0) {
            media = media / divisor;
        }

        return Math.round(media);
    }
    // ver detalhes do Livro
    function verLivro(id) {


        let m = Media(id);
        for (let i = 0; i < catalgo.length; i++) {

            // Comparar ids
            if (catalgo[i]._id == id) {
                titulo.innerHTML = catalgo[i]._titulo;
                body.innerHTML = ` <table>
                <tr>
                    <td>
                        <img id="CoverLivro" class="img-thumbnail" src="${catalgo[i]._capa}" alt="">
                    </td>
                    <td>
                        <p id="AutorLivro">
                            <strong>Autor: </strong>${catalgo[i]._autor}</p>

                        <p id="TagLivro">
                            <strong>Tags: </strong>${catalgo[i]._tag}</p>

                        <p id="GeneroLivro">
                            <strong>Género: </strong>${catalgo[i]._genero}</p>

                        <p id="EditoraLivro">
                            <strong>Editora: </strong>${catalgo[i]._editora}</p>

                        <p id="NpLivro">
                            <strong>Paginas: </strong>${catalgo[i]._npag}</p>

                        <p id="EstadoLivro">
                            <strong>Estado: </strong>${catalgo[i]._estado}</p>
                        <h5>Sinopse: </h5>
                        <p id="SinopseLivro">${catalgo[i]._sinopse}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label for="star">Pontuação: </label>`

                // Pontuação do livro
                for (let i = 0; i < m; i++) {
                    body.innerHTML += ` <span id = "star" class="fa fa-star checked"></span>`

                }

                body.innerHTML += `</td>
                </tr>
                <tr>
                    <td>
                    <br>
                     <label for="Pon${catalgo[i]._id}">Pontuar de 0 a 5: </label>
                        <input type="number" class="form-control" id="Pon${catalgo[i]._id}" min="0" max="5">
                    </td>
                </tr>
                <tr>
                    <td>
                     <label for="Com${catalgo[i]._id}">Comentar: </label>
                        <input type="text" class="form-control" id="Com${catalgo[i]._id}">
                    </td>
                </tr>`

                if (localStorage.getItem("Comentarios")) {
                    for (let i = 0; i < comentarios.length; i++) {

                        if (comentarios[i]._id_livro == id && comentarios[i]._comentar != "") {
                            body.innerHTML += `<tr>
                    <td>
                        <label for="User${comentarios[i]._id_perfil}"><strong>${users[comentarios[i]._id_perfil - 1]._nome}:</strong> </label>
                        <p id="User${comentarios[i]._id_perfil}">${comentarios[i]._comentar}</p>
                    </td>
                 </tr>`
                        }

                    }
                }

                body.innerHTML += `</table>`

            }

        }

        //Comentar
        let comentar = document.getElementById("Com" + id);
        comentar.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                DeixarComentario(id, comentar.value, -1);
                event.preventDefault();
            }

        })

        // Pontuar livro
        let pontuar = document.getElementById("Pon" + id);
        pontuar.addEventListener('keydown', function (e) {
            if (e.keyCode == 13) {
                DeixarComentario(id, "", pontuar.value);
                event.preventDefault();
            }

        })

        // Requesitar livro
        
            let requesitar = document.getElementById("requesitar");
            
            if(tipo != 2)
            requesitar.disabled = true;

            requesitar.addEventListener('click', function () {

               
                // Variaveis
                let userId;
                let year = new Date().getFullYear();
                let month = new Date().getMonth() + 1;
                let day = new Date().getDate();
                let existe = false;

                // get id user
                for (let i = 0; i < users.length; i++) {

                    if (users[i]._logIn) {
                        userId = users[i]._id;
                    }
                }

                // Se este local storage existir
                let elegivel = true;


                for (let i = 0; i < requesitos.length; i++) {
                    if (requesitos[i]._id_perfil == userId) {
                        elegivel = false;
                    }
                }
                 
               
                // Efectuar requesito
               
                    if (elegivel) {

                        // Criar objecto
                        let requisito = new Requisitar(userId, id, year + "-" + month + "-" + day, false);
                        
                        //adiconar há Array
                        requesitos.push(requisito);
                        // adiconar ao local storage
                       // localStorage.setItem("Requesitos", JSON.stringify(requesitos));
                       // localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));

                        alert("Requesito efectuado com sucesso");

                    }
                    else
                        alert("Já tens um livro requesitado! Tens que devolver o que tens para requesitar outro.");


            
            })


        // ver Livro
    }

    function DeixarComentario(id, comenta, pontua) {

        // variaveis
        let idUser;

        // get id user
        for (let i = 0; i < users.length; i++) {

            if (users[i]._logIn) {
                idUser = users[i]._id;
            }
        }

        for (let i = 0; i < comentarios.length; i++) {
            if (comentarios[i]._id_perfil == idUser) {
                existe = true;
            }
        }

        let comentario = new Comentario(idUser, id, comenta, pontua);

        // Puxar para a Array
        comentarios.push(comentario);

        // adiconar ao local storage
        localStorage.setItem("Comentarios", JSON.stringify(comentarios));
        verLivro(id);

        event.preventDefault();
    }


}

