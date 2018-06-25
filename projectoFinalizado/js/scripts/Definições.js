window.onload = function () {
    // Variaveis glubais
    let users = [];
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");
    let form = document.getElementById("frm");
    let multa = document.getElementById("multa");
    let custo = document.getElementById("custo");
    let dias = document.getElementById("dias");
    let pagar = document.getElementById("pagar");
    let tags = [];
    let Categorias = [];
    let multas = "";

    if (localStorage.getItem("TAGSDef"))
        tags = JSON.parse(localStorage.getItem("TAGSDef"));

    if (localStorage.getItem("Categorias"))
        Categorias = JSON.parse(localStorage.getItem("Categorias"));

    if (localStorage.getItem("multas"))
        multas = JSON.parse(localStorage.getItem("multas"));

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

    // Adicionar multa
    multa.addEventListener("click", function () {

        // Obter dados
        let guardar = new Multa(dias.value, custo.value / dias.value, custo.value);
        multas = guardar;

        localStorage.setItem("multas", JSON.stringify(multas));
        renderTables();
        event.preventDefault();

    })

    // Adicionar

    renderTables();
    function renderTables() {

        if (multas != "") {
            custo.value = parseFloat(multas._limite);
            dias.value = parseFloat(multas._dias);
            pagar.innerHTML = multas._valor + "€";
        }
        // HTML a inserir 
        let tabelaCategoria = `<table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Categorias</th>
            <th scope="col">Número de livros</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody style="background-color: white">`

        // Ciclo
        for (let i = 0; i < Categorias.length; i++) {

            tabelaCategoria += `<tr>
            <th scope="row">${Categorias[i]._nome}</th>
            <td>0</td>
            <td>
            <a id="${Categorias[i]._id}" class="removeCat" ><i class="fas fa-trash-alt"></i></a></td>
            </tr>`

        }
        tabelaCategoria += `</tbody>
        </table>`


        let tabelaTag = `<table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Tags</th>
            <th scope="col">Número de livros</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody style="background-color: white">`

        for (var i = 0; i < tags.length; i++) {

            tabelaTag += `<tr>
            <th scope="row">${tags[i]._nome}</th>
            <td>0</td>
            <td>
            <a id="${tags[i]._id}" class="removeTag" ><i class="fas fa-trash-alt"></i></a></td>
            </tr>`

        }


        tabelaTag += `</tbody>
        </table>`

        document.getElementById("Categoria").innerHTML = tabelaCategoria;
        document.getElementById("Tag").innerHTML = tabelaTag;

        // remover categoria
        let btnRemoveCat = document.getElementsByClassName("removeCat");
        for (let i = 0; i < btnRemoveCat.length; i++) {

            btnRemoveCat[i].addEventListener("click", function () {
                let id = btnRemoveCat[i].getAttribute("id");
                RemoverCategoria(id);
                renderTables();
            })


        }

        // remover Tag
        let btnremoveTag = document.getElementsByClassName("removeTag");
        for (let i = 0; i < btnremoveTag.length; i++) {

            btnremoveTag[i].addEventListener("click", function () {
                let id = btnremoveTag[i].getAttribute("id");
                RemoverTag(id);
                renderTables();
            })


        }

    }

    function RemoverCategoria(id) {

        for (let i = 0; i < Categorias.length; i++) {

            if (Categorias[i]._id == id) {
                Categorias.splice(i, 1);
            }

        }

        // Actualizar id
        for (let i = 0; i < Categorias.length; i++) {

            Categorias[i]._id = i;

        }
        // adiconar ao local storage
        localStorage.setItem("Categorias", JSON.stringify(Categorias));
    }


    function RemoverTag(id) {

        for (let i = 0; i < tags.length; i++) {

            if (tags[i]._id == id) {
                tags.splice(i, 1);
            }

        }

        // Actualizar id
        for (let i = 0; i < tags.length; i++) {

            tags[i]._id = i;

        }
        // adiconar ao local storage
        localStorage.setItem("TAGSDef", JSON.stringify(tags));
    }

    form.addEventListener('submit', function () {

        event.preventDefault();
        // Obter filtro 
        let filtro = document.getElementById("Filtro").value;
        let texto = document.getElementById("texto").value;

        localStorage.setItem("Categorias", JSON.stringify(Categorias));

        if (filtro == "Tag") {

            let tag = new Tag(texto);

            tags.push(tag);

            // adiconar ao local storage
            localStorage.setItem("TAGSDef", JSON.stringify(tags));
        }

        if (filtro == "Categoria") {

            let categoria = new Categoria(texto);

            Categorias.push(categoria);
            // adiconar ao local storage
            localStorage.setItem("Categorias", JSON.stringify(Categorias));
        }

        renderTables();
    })


}