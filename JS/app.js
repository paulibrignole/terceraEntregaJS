
const productosDiv = document.getElementById("productos");
const carritoDeCompras = document.getElementById("carrito");
const carritoModal = document.getElementById("carritoModal");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const cardCarrito = document.getElementById("cardCarrito");
const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
const productosEnDescuento = document.getElementById("productosEnDescuento");
const precioTotalCarrito = document.getElementById("precioTotalCarrito");

// funcion para tomar los productos mediante fetch y mostrarlos en pantalla recorriendo el array
const mostrarProductos = () => {
    fetch('/data/productos.json')
        .then(resp => resp.json())
        .then(dato => {
            dato.forEach(producto => {
                const cadaProducto = document.createElement("div");
                cadaProducto.innerHTML = `
                    <div id="card-body" class="card" style="width: 15rem;">
                        <img class="card-img-top" id="imgProducto" src="${producto.imagen}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${producto.producto}</h5>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <button class="btnAgregarCarrito" id=${producto.id}>Agregar al carrito</button>
                        </div>
                    </div>
                `
                productosDiv.append(cadaProducto);

                const btnCarrito = document.getElementById(producto.id);
                btnCarrito.addEventListener("click", () => agregarAlCarrito(producto));
            })
        })
        .catch((e) => console.log(e));
}



let carrito = [];

//funcion para validar si el carrito esta vacio
const carritoVacio = () => {
    if (carrito.length === 0) {
        const p = document.createElement("p");
        p.innerHTML = '<p id="carritoVacioMsj" >Tu carrito de compras esta vacio!</p>'
        carritoModal.append(p);
    } 
}

//evento sobre el document para que cuando se cargue muestre los productos 
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();
    carritoVacio();  
})

//funciones para enviar y tomar datos del localStorage
const mandarInfoALS = (clave,valor) => localStorage.setItem(clave,valor)
const recuperarInfoLS = valor => localStorage.getItem(valor)

//funcion para sumar el precio total del carrito
const precioTotalProductos = () => {
    precioTotalCarrito.innerHTML = carrito.reduce((acc,prod) => acc + prod.precio, 0);
}

//funcion para agregar los productos al array carrito
const agregarAlCarrito = (prod) => {
    let productExist = carrito.some(product => product.id === prod.id)
    if (productExist) {
        carrito.map(product => {
            if (product.id === prod.id) {
                prod.cantidad++
                Toastify({
                    text: "Producto agregado",
                    gravity: "top",
                    position: "left",
                    duration: 1000,
                    style: {
                        background: "#ff009d",
                        border: "1px solid black",
                        borderRadius: "10px"
                    }
                }).showToast();
                agregarProductoAlModal();
            }
        })
    } else {
        carrito.push({
            id: prod.id,
            nombre: prod.producto,
            precio: prod.precio,
            cantidad: prod.cantidad,
            imagen: prod.imagen
        });
        Toastify({
            text: "Producto agregado",
            gravity: "top",
            position: "left",
            duration: 1000,
            style: {
                background: "#ff009d",
                border: "1px solid black",
                borderRadius: "10px"
            }
        }).showToast();
        agregarProductoAlModal();    
    }
}

//funcion para mostrar el array carrito en el modal
const agregarProductoAlModal = () => {
    carritoModal.innerHTML = '';
    carrito.forEach(product => {
        let productosEnCarrito = document.createElement("div");
        productosEnCarrito.innerHTML = `
            <div id="cardCarrito" class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${product.imagen}" id="imgProductoCarrito" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.nombre}</h5>
                            <p class="card-text">Precio: $${product.precio}</p>
                            <p class="card-text">Cantidad: ${product.cantidad}</p>
                            <button class="eliminarProductoCarrito" id=${product.id} >Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
            `
        carritoModal.append(productosEnCarrito);

        const borrarProd = document.getElementById(product.id);
        borrarProd.addEventListener("click", () => borrarProdCarrito(productosEnCarrito,product.id));
    });
    precioTotalProductos();
}

//funcion para borrar los productos uno por uno del carrito
const borrarProdCarrito = (divProd , id) => {
    divProd.classList.add("eliminarProd")
    setTimeout(() => {
        carrito = carrito.filter(prod => prod.id !== id);
        agregarProductoAlModal();
    },600)
    carritoVacio()
}

//funcion para vaciar el carrito 
btnVaciarCarrito.addEventListener("click", () => {
    carritoModal.classList.add("eliminarProd")
    setTimeout(()=> {
        carrito = [];
        agregarProductoAlModal();
        carritoModal.classList.remove("eliminarProd");
    },700)
    carritoVacio()
});

//funcion para redireccionar al usuario para que finalice su compra
btnFinalizarCompra.addEventListener("click", () => {
    mandarInfoALS("carrito", JSON.stringify(carrito));  
    location.href = '/Html/comprar.html';
});  