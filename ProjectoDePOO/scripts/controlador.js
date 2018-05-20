
window.onload = function () {
    // Referências para os elementos html da nav bar
    let optLogin = document.getElementById("optLogin");
    let optLogout = document.getElementById("optLogout");
    let optHi = document.getElementById("optHi");
    let optRegister = document.getElementById("optRegister");
    let opcao = document.getElementById("opções");
    let frmRecent = document.getElementById("Recentes");

    //Variaveis globais
    let users = [];


    // Esconder opções de quem não está com a conta ativa
    optLogout.style.display = 'none';
    optHi.style.display = 'none';
    opcao.style.visibility = 'hidden';

    // Conta ativa de utilisador
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
            // Alterar nav bar 
            optLogin.style.display = 'none';
            optRegister.style.display = 'none';
            optLogout.style.display = 'block';

            optHi.innerHTML = "<a class='nav-link' href='#'>Olá, " +
                users[id].nome + "</a>";
            optHi.style.display = 'block';
            opcao.style.visibility = 'visible';
        }

    }

    EstadoDeLogIn();

    // Fazer o registo de utilizador
    let frmRegisto = document.getElementById("submit");
    frmRegisto.addEventListener("click", function () {

        // Validar pass iguais
        let inputPassword1 = document.getElementById("pass1").value;
        let inputPassword2 = document.getElementById("pass2").value;
        let strErro = "";

        if (inputPassword1 != inputPassword2) {
            strErro = "As passwords têm de ser iguais"
        }

        // Validar se já existe um user com o mesmo email
        let inputEmail = document.getElementById("email").value;
        let existe = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == inputEmail) {
                existe = true;
            }

        }

        if (existe == true) {
            strErro += "\n Email já existe!";
        }

        // Registar utilizador
        if (strErro == "") {
            let inputNome = document.getElementById("nome").value;
            let novoPerfil = new Perfil(inputNome, inputEmail, inputPassword1, "cliente", 0, true);

            //Guardar novo utilizador
            users.push(novoPerfil);
            localStorage.setItem("Utilizadores", JSON.stringify(users));

            //Alerta de sucesso!
            alert("Registo efectuado com sucesso!!");

            //Fechar a modal
            $('#registoModal').modal('hide');
            // Alterar nav bar 
            EstadoDeLogIn();

        } else {
            alert(strError);
            frmRegisto.reset();
            inputNome.focus();
        }
        event.preventDefault();
    })

    //Fazer Login
    let btnEntrar = document.getElementById("entrar")
    btnEntrar.addEventListener('click', function () {
        // Dados dos inputs
        let email = document.getElementById("email1").value;
        let pass = document.getElementById("pass").value;

        // Variaveis
        let existe = false;

        // Lista de utilizadores
        if (localStorage.getItem("Utilizadores"))
            users = JSON.parse(localStorage.getItem("Utilizadores"));

        // Pocorrer lista
        for (let i = 0; i < users.length; i++) {

            if (users[i]._email == email || users[i]._password == pass) {
                users[i]._logIn = true;
                existe = true;
            }
        }

        // Se não existires
        if (existe == true) {

            //Gravar alterações
            localStorage.setItem("Utilizadores", JSON.stringify(users));

            //Fechar a modal
            $('#loginModal').modal('hide');
            // alterar nav bar
            EstadoDeLogIn();
        } else {
            alert("Erro!!!");
        }
        event.preventDefault();
    })

    // Desligar conta 
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

    livrosRecentes(frmRecent);
}