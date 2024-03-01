

const form = document.getElementById("form");

const cuentas = [];

//evento sobre el formulario
form.addEventListener("submit", (e) => {
    e.preventDefault()

    //tomar el valor de lo ingresado en los inputs
    let name = e.target.children[1].value;
    let user = e.target.children[2].value;
    let pass = e.target.children[3].value;
    
    //validar si los inputs tienen algo ingresado
    if (name != "" && user != "" && pass != ""){
        setTimeout(() => {
            //se crea la cuenta y se envian los datos a un array
            swal({
                title: "¡Excelente!",
                text: "¡Tu cuenta se creo con exito! Podés ir al home y comprar.",
                icon: "success",
                });
            cuentas.push({
                nombre: name,
                usuario: user,
                contraseña: pass
            });
            //se envian los datos al localStorage
            localStorage.setItem("cuentas", JSON.stringify(cuentas));
        }, 500)

    } else {
        alert("Falta algun dato")
    }

    //se envian los datos al localStorage
    localStorage.setItem("cuentas", JSON.stringify(cuentas));

    e.target.children.value = "";

});