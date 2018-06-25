window.onload = function () {

    let table = document.getElementById("Tabela");
    let bibliotecas = [];
    let users = [];
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");
    let Id_biblioteca;

    // Buscar dados 
    let freguesiaEdit = document.getElementById("FreguesiaEdit");
    let moradaEdit = document.getElementById("MoradaEdit");
    let capacidadeEdit = document.getElementById("CapacidadeEdit");
    let gpsEdit = document.getElementById("GPSEdit");

    // Se o localStorage existir
    if (localStorage.getItem("Bibliotecas"))
    bibliotecas = JSON.parse(localStorage.getItem("Bibliotecas"));

     // Lista de utilizadores
     if (localStorage.getItem("Utilizadores"))
     users = JSON.parse(localStorage.getItem("Utilizadores"));


    // alterar nav bar
    function EstadoDeLogIn() {

        let activo = false;
        let id = 0;
       



        for (let i = 0; i < users.length; i++) {

            if (users[i]._logIn) {
                activo = true;
                id = i;
            }
        }

        if (activo) {
            optHi.innerHTML = "<a class='nav-link' href='#'>Olá, " +
                users[id]._nome + "</a>";
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

    // Convocar tabela
    RenderTable();

    // Guardar dados do campo
    let btnRegister = document.getElementById("Registar");
    btnRegister.addEventListener("click", function () {

        // buscar dados
        let freguesia = document.getElementById("Freguesia").value;
        let morada = document.getElementById("Morada").value;
        let capacidade = document.getElementById("Capacidade").value;
        let gps = document.getElementById("GPS").value;

        //Criar objecto
        let biblioteca = new Biblioteca(freguesia, morada, capacidade, livros = [], gps);

        bibliotecas.push(biblioteca);

        // Guardar nova biblioteca
        localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));

        alert("Foi registado com sucesso");

        // Fechar modal
        $('#modelId').modal('hide');

        //Actualizar tabela
        RenderTable();

        event.preventDefault();
    })

    function RenderTable() {

        // Html a inserir
        let html = `<table class="table">
        <thead class="thead-dark">
          <tr>
          <th scope="col">code</th>
            <th scope="col">Freguesia</th>
            <th scope="col">Morada</th>
            <th scope="col">Capacidade</th>
            <th scope="col">GPS</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody style="background-color: white">`

        for (let i = 0; i < bibliotecas.length; i++) {

            html += `<tr>
            <th scope="row">${bibliotecas[i]._code}</th>
            <td>${bibliotecas[i]._freguesia}</td>
            <td>${bibliotecas[i]._morada}</td>
            <td>${bibliotecas[i]._capacidade}</td>
            <td>${bibliotecas[i]._gps}</td>
            <td><a id="${bibliotecas[i]._code}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
            <a id="${bibliotecas[i]._code}" class="remove" ><i class="fas fa-trash-alt"></i></a>
            </tr>`
        }

        html += `</tbody>
        </table>`


        table.innerHTML = html;

        // Obter todos os botões remover
        let btnRemove = document.getElementsByClassName("remove");
        for (let i = 0; i < bibliotecas.length; i++) {
            btnRemove[i].addEventListener("click", function () {
                let id = btnRemove[i].getAttribute("id");
                removerBiblioteca(id);
                RenderTable();
            })

        }

        // Obter todos os botões editar
        let btnEdit = document.getElementsByClassName("edit");
        for (let i = 0; i < bibliotecas.length; i++) {
            btnEdit[i].addEventListener("click", function () {
                let id = btnEdit[i].getAttribute("id");
                Id_biblioteca = id;
                editBiblioteca(id);
            })

        }
    }

    // Remover biblioteca
    function removerBiblioteca(id) {

        for (let i = 0; i < bibliotecas.length; i++) {

            if (bibliotecas[i]._code == id) {
                bibliotecas.splice(i, 1);
            }

        }

        // Actualizar id
        for (let i = 0; i < bibliotecas.length; i++) {

            bibliotecas[i]._code = i + 1;

        }
        // adiconar ao local storage
        localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));
    }

    // Editar biblioteca
    function editBiblioteca(id) {

        for (let i = 0; i < bibliotecas.length; i++) {

            if (bibliotecas[i]._code == id) {
                freguesiaEdit.value = bibliotecas[i]._freguesia;
                moradaEdit.value = bibliotecas[i]._morada;
                capacidadeEdit.value = bibliotecas[i]._capacidade;
                gpsEdit.value = bibliotecas[i]._gps;
            }

        }
    }

    // Concluir o registar alterações
    let btnEditRegister = document.getElementById("RegistarEdit");
    btnEditRegister.addEventListener("click", function () {

        // Alterar
        for (let i = 0; i < bibliotecas.length; i++) {
            if (bibliotecas[i]._code == Id_biblioteca) {

                bibliotecas[i]._freguesia = freguesiaEdit.value;
                bibliotecas[i]._morada = moradaEdit.value;
                bibliotecas[i]._capacidade = capacidadeEdit.value;
                bibliotecas[i]._gps = gpsEdit.value;
            }

        }

        // Guardar nova biblioteca
        localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));

        alert("Foi Alterado");

        // Fechar modal
        $('#modelEdit').modal('hide');

        //Actualizar tabela
        RenderTable();

        event.preventDefault();
    })
}