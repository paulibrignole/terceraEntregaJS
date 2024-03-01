

const form = document.getElementById("form");

//evento sobre el formulario
form.addEventListener("submit", (e) => {
    e.preventDefault()
    
    //tomar del localStorage el array con las cuentas creadas
    let cuenta = JSON.parse(localStorage.getItem("cuentas"));   

    //buscar un user/pass que este en el array con las cuentas
    let user = cuenta.find(usuario => usuario.usuario === e.target.children[1].value);
    let pass = cuenta.find(contraseña => contraseña.contraseña === e.target.children[2].value);

    //validar si se encontro el user/pass en el array
    if (user !== undefined && pass !== undefined) {
        setTimeout(()=> {
            swal({
                title: "¡Listo!",
                text: "Ya iniciaste sesión. Ahora podés continuar tu compra.",
                icon: "success",
            });
            setTimeout(()=> {
                //se ingresa a la cuenta y se redirecciona al index
                location.href = "/Html/index.html";
            }, 1500)
        },800)
        
    } else {
        swal({
            title: "Ha ocurrido un problema",
            text: "No pudimos encontrar tu usuario y/o contraseña, volvé a intentarlo.",
            icon: "warning",
            });
    }
})