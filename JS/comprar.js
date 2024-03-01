
const mostrarCarritoAside = document.getElementById("mostrarCarritoAside");
const precioFinalCarrito = document.getElementById("precioFinalCarrito");
const btnFinalizarCompra = document.getElementById("finalizarCompra");
const formPago = document.getElementById("formPago");

//tomar el carrito del localStorage
let carrito = JSON.parse(localStorage.getItem("carrito"));

//funcion para calcular total del carrito
const calcularTotalCarrito = () => {
    precioFinalCarrito.innerHTML = carrito.reduce((acc,prod) => acc + prod.precio, 0);
}

//funcion para mostrar los productos finales del carrito de compras
const mostrarCarrito = () => {
    carrito.forEach(producto => {
        let productosEnCarrito = document.createElement("div")
        productosEnCarrito.innerHTML = `
            <div id="carritoFinal">
                <img src="${producto.imagen}" id="imgCarritoFinal">
                <div>
                    <h5>${producto.nombre}</h5>
                    <p>Precio: $${producto.precio}</p>
                </div>
            </div>
            `
        mostrarCarritoAside.append(productosEnCarrito)
    })
}

//evento que se ejecutara cuando se carge el archivo
document.addEventListener("DOMContentLoaded", () => {
    mostrarCarrito()
    calcularTotalCarrito()
})

//funcion para finalizar la compra mediante el boton del formulario
formPago.addEventListener("submit", (e) => {
    e.preventDefault();
    let nombre = e.target.children[0].value;
    let nro = e.target.children[1].value;
    let fecha = e.target.children[2].value;
    let codigo = e.target.children[3].value;

    if (nombre != "" && nro != "" && fecha != "" && codigo != "") {
        setTimeout(()=> {
            swal({
                title: "Compra finalizada!",
                text: "Podés continuar tu compra!",
                icon: "success",
                });
            setTimeout(()=> {
                location.href = '/Html/index.html'
            },2000);
        },1000)
    }
})