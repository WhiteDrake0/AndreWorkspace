window.onload = function () {

    // variaveis globais
    let bibliotecas = [];
    let catalgo = [];
    let users = [];
    let requesitos = [];
    let multa = [];
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");
    let opAdmin = document.getElementById("opAdmin");
    let opLevantamento = document.getElementById("opLevantamento");

    // Esconder opções de quem não está com a conta ativa
    optLogout.style.display = 'none';
    optHi.style.display = 'none';
    opLevantamento.style.display = 'none';
    opAdmin.style.display = 'none';

    // Lista de utilizadores
    if (localStorage.getItem("Utilizadores"))
        users = JSON.parse(localStorage.getItem("Utilizadores"));

    // Lista de livros
    if (localStorage.getItem("Catalgo"))
        catalgo = JSON.parse(localStorage.getItem("Catalgo"));

    // lista de requesitos
    if (localStorage.getItem("Requesitos"))
        requesitos = JSON.parse(localStorage.getItem("Requesitos"));

    // Se o localStorage existir
    if (localStorage.getItem("Bibliotecas"))
        bibliotecas = JSON.parse(localStorage.getItem("Bibliotecas"));

    if (localStorage.getItem("multas"))
        multas = JSON.parse(localStorage.getItem("multas"));

    // alterar nav bar
    function EstadoDeLogIn() {


        let activo = false;
        let id = 0;
        let tipo = 2;
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

    actulizarMulta();
    function actulizarMulta() {

        if (localStorage.getItem("multas")) {
            for (let i = 0; i < users.length; i++) {

                for (let i = 0; i < requesitos.length; i++) {

                    if (requesitos[i]._id_perfil == users[i]._id) {
                        let datalimite = new Date(requesitos[i]._data_entrega).getTime();
                        let dataActual = new Date().getTime();
                        let umDia = 24 * 60 * 60 * 1000;
                        let novaMulta = 0;
                        let custo = multa._valor;

                        if (datalimite < dataActual && users._multa < multa._limite) {

                            // diferença de dias
                            var difdias = Math.round(Math.abs((dataActual - datalimite) / (umDia)));
                            users[i]._multa = custo * difdias
                        }
                    }

                }

            }

            // Guardar alteração
            localStorage.setItem("Utilizadores", JSON.stringify(users));
        }
    }

    RenderTable("");
    function RenderTable(email) {

        let Table = document.getElementById("Tabela")

        let htmltb = "";

        htmltb += ` <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col"> Nome do livro</th>
                <th scope="col"> Cliente</th>
                <th scope="col"> Comfirmar Levantamento</th>
                <th scope="col"> Comfirmar Devolução</th>
                <th scope="col">Dia da entrega</th>
                <th scope="col">multa</th>
              </tr>
            </thead>
            <tbody style="background-color: white">`

        for (let i = 0; i < requesitos.length; i++) {

            if (users[requesitos[i]._id_perfil - 1]._email == email) {
                htmltb += `<tr>
            <th scope="row">${catalgo[requesitos[i]._id_livro - 1]._titulo}</th>
            <td>${users[requesitos[i]._id_perfil - 1]._email}</td>`

                if (requesitos[i]._estado_Requesito == false) {
                    htmltb += `<td><input class = "confirmeRequesito" id = "${requesitos[i]._id}" type="button" value="Confirmar"></td>`
                }
                else {
                    htmltb += `<td><input class = "confirmeRequesito" id = "${requesitos[i]._id}" type="button" value="Confirmar" disabled></td>`
                }
                if (requesitos[i]._estado_Requesito == true) {
                    htmltb += `<td><input class = "confirmeDevolucao" id = "${requesitos[i]._id}" type="button" value="Confirmar"></td>`
                }
                else {
                    htmltb += `<td><input class = "confirmeDevolucao" id = "${requesitos[i]._id}" type="button" value="Confirmar" disabled></td>`
                }

                htmltb += `<td>${requesitos[i]._data_entrega}</td>
                <td>${users[requesitos[i]._id_perfil - 1]._multa}</td>`
                htmltb += `</tr>`
            }

            if (email == "") {
                htmltb += `<tr>
                <th scope="row">${catalgo[requesitos[i]._id_livro - 1]._titulo}</th>
                <td>${users[requesitos[i]._id_perfil - 1]._email}</td>`

                if (requesitos[i]._estado_Requesito == false) {
                    htmltb += `<td><input class = "confirmeRequesito" id = "${requesitos[i]._id}" type="button" value="Confirmar"></td>`
                }
                else {
                    htmltb += `<td><input class = "confirmeRequesito" id = "${requesitos[i]._id}" type="button" value="Confirmar" disabled></td>`
                }
                if (requesitos[i]._estado_Requesito == true) {
                    htmltb += `<td><input class = "confirmeDevolucao" id = "${requesitos[i]._id}" type="button" value="Confirmar"></td>`
                }
                else {
                    htmltb += `<td><input class = "confirmeDevolucao" id = "${requesitos[i]._id}" type="button" value="Confirmar" disabled></td>`
                }
                htmltb += `<td>${requesitos[i]._data_entrega}</td>
                <td>${users[requesitos[i]._id_perfil - 1]._multa}</td>`
                htmltb += `</tr>`
            }
        }



        htmltb += `</tbody>
          </table>`

        Table.innerHTML = htmltb;
        //Obter todos as confirmeRequesito btns
        let confirmeRequesito = document.getElementsByClassName("confirmeRequesito");
        for (let i = 0; i < confirmeRequesito.length; i++) {
            confirmeRequesito[i].addEventListener("click", function () {
                let requisitoId = confirmeRequesito[i].getAttribute("id");
                for (let i = 0; i < requesitos.length; i++) {

                    if (requesitos[i]._id == requisitoId) {
                        requesitos[i]._estado_Requesito = true;
                    }

                }

                // adiconar ao local storage
                localStorage.setItem("Requesitos", JSON.stringify(requesitos));
                RenderTable("");
                event.preventDefault();
            })
        }

        //Obter todos as confirmeDevolucao btns
        let confirmeDevolucao = document.getElementsByClassName("confirmeDevolucao");
        for (let i = 0; i < confirmeDevolucao.length; i++) {
            confirmeDevolucao[i].addEventListener("click", function () {
                let requisitoId = confirmeDevolucao[i].getAttribute("id");
                ConfirmarDev(requisitoId);
                RenderTable("");
                event.preventDefault();
            })
        }
    }

    // Procurar e Filtrar
    let form = document.getElementById("frm");
    form.addEventListener('submit', function () {

        let Email = document.getElementById("ProcurarInput").value;
        event.preventDefault();
        RenderTable(Email);
    })

    function ConfirmarDev(requisitoId) {

        let biblioteca = prompt("Nome da freguesia da biblioteca a devolver o livro");
        let existe = false;
        let out = true;
        for (let i = 0; i < bibliotecas.length; i++) {

            if (bibliotecas[i]._freguesia == biblioteca) {
                existe = true;

                if (bibliotecas[i]._livros.length < bibliotecas[i]._capacidade) {
                    out = false;
                    bibliotecas[i]._livros.push(requesitos[requisitoId - 1]._id_livro);
                    localStorage.setItem("Bibliotecas", JSON.stringify(bibliotecas));
                }
            }

        }

        if (existe) {
            if (!out) {
                for (let i = 0; i < requesitos.length; i++) {

                    if (requesitos[i]._id == requisitoId) {
                        requesitos.splice(i, 1);
                    }
                }
                // adiconar ao local storage
                localStorage.setItem("Requesitos", JSON.stringify(requesitos));

            } else alert("Biblioteca cheia")

        } else alert("Não existe registo de tal biblioteca nessa freguesia")


    }
}
