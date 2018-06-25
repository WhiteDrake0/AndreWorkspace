window.onload = function () {
    // Variaveis globais HTML
    let table = document.getElementById("Tabela");
    let form = document.getElementById("frm");
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");

    // Variaveis globais
    let users = [];
   

    // Lista de utilizadores
    if (localStorage.getItem("Utilizadores")) {
        users = JSON.parse(localStorage.getItem("Utilizadores"));
    }

    let Id_users;
    let Email = "";
    let filtrar = "";

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

    // Procurar e Filtrar
    form.addEventListener('submit', function () {
        Email = document.getElementById("ProcurarInput").value;
        filtrar = document.getElementById("Filtro").value;

        event.preventDefault();
        renderTable(Email, filtrar);


    })

    let Concluir = document.getElementById("Concluir");
    Concluir.addEventListener("click", function () {

        let tipo = document.getElementById("FiltroEdit").value;
        for (let i = 0; i < users.length; i++) {

            if (users[i]._id == Id_users) {
                users[i]._tipo = tipo;
            }

        }

        // Actualizar local storage
        localStorage.setItem("Utilizadores", JSON.stringify(users));

        renderTable(Email, filtrar);

        // Fechar modal
        $('#modelId').modal('hide');
    })

    // Renderizar tabela
    renderTable(Email, filtrar);
    function renderTable(email, filtro) {

        // Html a inserir
        let html = `<table class="table">
     <thead class="thead-dark">
       <tr>
         <th scope="col">Nome</th>
         <th scope="col">Email</th>
         <th scope="col">Tipo</th>
         <th scope="col">Ações</th>
       </tr>
     </thead>
     <tbody style="background-color: white">`

        for (let i = 0; i < users.length; i++) {

            if (users[i]._email == email) {
                if (filtro == users[i]._tipo) {
                    html += `<tr>
                <th scope="row">${users[i]._nome}</th>
                <td>${users[i]._email}</td>`

                    if (users[i]._tipo == 0)
                        html += `<td>Admenistrador</td>`
                    if (users[i]._tipo == 1)
                        html += `<td>Operador</td>`
                    if (users[i]._tipo == 2)
                        html += `<td>Cliente</td>`

                    html += `
                <td><a id="${users[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                <a id="${users[i]._id}" class="remove" ><i class="fas fa-trash-alt"></i></a>
                </tr>`


                }

                if (filtro == "") {
                    html += `<tr>
                    <th scope="row">${users[i]._nome}</th>
                    <td>${users[i]._email}</td>`

                    if (users[i]._tipo == 0)
                        html += `<td>Admenistrador</td>`
                    if (users[i]._tipo == 1)
                        html += `<td>Operador</td>`
                    if (users[i]._tipo == 2)
                        html += `<td>Cliente</td>`

                    html += `
                    <td><a id="${users[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                    <a id="${users[i]._id}" class="remove" ><i class="fas fa-trash-alt"></i></a>
                    </tr>`


                }
            }

            if (email == "") {

                if (filtro == users[i]._tipo) {
                    html += `<tr>
                <th scope="row">${users[i]._nome}</th>
                <td>${users[i]._email}</td>`

                    if (users[i]._tipo == 0)
                        html += `<td>Admenistrador</td>`
                    if (users[i]._tipo == 1)
                        html += `<td>Operador</td>`
                    if (users[i]._tipo == 2)
                        html += `<td>Cliente</td>`

                    html += `
                <td><a id="${users[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                <a id="${users[i]._id}" class="remove" ><i class="fas fa-trash-alt"></i></a>
                </tr>`


                }

                if (filtro == "") {
                    html += `<tr>
                    <th scope="row">${users[i]._nome}</th>
                    <td>${users[i]._email}</td>`

                    if (users[i]._tipo == 0)
                        html += `<td>Admenistrador</td>`
                    if (users[i]._tipo == 1)
                        html += `<td>Operador</td>`
                    if (users[i]._tipo == 2)
                        html += `<td>Cliente</td>`

                    html += `
                    <td><a id="${users[i]._id}" class="edit" data-toggle="modal" href="#modelEdit"><i class="fas fa-edit"></i></a>
                    <a id="${users[i]._id}" class="remove" ><i class="fas fa-trash-alt"></i></a>
                    </tr>`


                }

            }

        }

        html += `</tbody>
     </table>`


        table.innerHTML = html;

        // Obter todos os botões remover
        let btnRemove = document.getElementsByClassName("remove");
        for (let i = 0; i < btnRemove.length; i++) {
            btnRemove[i].addEventListener("click", function () {
                let Id = users[i]._id;
                removerusers(Id);
                RenderTable(Email, filtrar);

            })

        }

        // Obter todos os botões editar
        let btnEdit = document.getElementsByClassName("edit");
        for (let i = 0; i < btnEdit.length; i++) {
            btnEdit[i].addEventListener("click", function () {
                Id_users = users[i]._id;
            })

        }
    }

    function removerusers(id) {

        for (let i = 0; i < users.length; i++) {

            if (users[i]._id == id) {
                users.splice(i, 1);
            }

        }

        // Actualizar id
        for (let i = 0; i < users.length; i++) {

            users[i]._id = i + 1;

        }
        // Actualizar local storage
        localStorage.setItem("Utilizadores", JSON.stringify(users));
    }



}