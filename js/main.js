let notebook = "";
let notebooks = [];
const carrito = obtenerCarrito();
const cards = $("#listaNotebooks");
const masCarrito = $("#carrito");
const vaciar = $("#vaciar");
masCarrito.click(manejadorClick);
cards.click(manejadorClick);
vaciar.click(vaciarCarrito);

/* ------------------------------------------------------- */

$(document).ready(function () {
  $.get("js/notebooks.json", function (data) {
    notebooks = data;
    verNotebooks();
  });
  mostrarCarrito();
});

function verNotebooks() {
  cards.html("");
  let contenidoHtml = "";

  for (let notebook of notebooks) {
    contenidoHtml += `
    <div class="card animado" style="width: 20rem">
       <div class="card-image">
         <img class="imagen" src="${notebook.imagen}">
         <span class="card-title"></span>
       </div>
       <div class="card-title">
         <span class="mispan">${notebook.nombre}</span>
         <p>$ ${notebook.precio}</p>
      </div>
       <div class="card-content">                   
         <button class="botonAgregarCarrito btn btn-outline-info" id = "${notebook.id}">Comprar</button>
       </div>
     </div>
`;
  }
  cards.html(contenidoHtml);
}
/* ----------------------------------------------------------- */

function sumartodos(numeros) {
  let suma = 0;
  for (let i = 0; i < numeros.length; i++) {
    suma += numeros[i];
  }
  return suma;
}

function manejadorClick(evento) {
  const elemento = evento.target;
  if (
    elemento.classList.contains("botonAgregarCarrito") ||
    elemento.classList.contains("botonSumarCarrito")
  ) {
    for (let i = 0; i < notebooks.length; i++) {
      if (elemento.id == notebooks[i].id) {
        const copiaNotebook = JSON.parse(JSON.stringify(notebooks[i]));
        agregarAlCarrito(copiaNotebook, 1);
        mostrarCarrito();
      }
    }
  }
  if (elemento.classList.contains("botonRestarCarrito")) {
    for (let i = 0; i < notebooks.length; i++) {
      if (elemento.id == notebooks[i].id) {
        const copiaNotebook = JSON.parse(JSON.stringify(notebooks[i]));
        agregarAlCarrito(copiaNotebook, -1);
        mostrarCarrito();
      }
    }
  }
}

function agregarAlCarrito(notebook, cantidad) {
  let esta = false;
  for (let i = 0; i < carrito.length; i++) {
    if (notebook.id == carrito[i].id) {
      esta ||= true;
      carrito[i].cantidad += cantidad;
      if (carrito[i].cantidad <= 0) {
        carrito.splice(i, 1);
      }
    } else {
      esta ||= false;
    }
  }
  if (esta != true) {
    notebook.cantidad = 1;
    carrito.push(notebook);
  }
  guardarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
function obtenerCarrito() {
  let carritoJson = localStorage.getItem("carrito");
  if (carritoJson) {
    return JSON.parse(carritoJson);
  } else {
    return [];
  }
}

function mostrarCarrito() {
  let totalSumaCarrito = 0;
  let carritoHtml = $("#carrito");
  let filaCarrito = "";
  let totalCarritoHtml = $("#totalCarrito");
  carritoHtml.html("");
  totalCarritoHtml.html("");
  let totalFinalSumaCarrito = "";
  for (let notebook of carrito) {
    totalSumaCarrito +=
      parseFloat(notebook.precio) * parseFloat(notebook.cantidad);
    filaCarrito += `
                           
                            <tr >     
                            <td scope="row"class="marca">${notebook.nombre}</td>
                            <td>${notebook.cantidad}</td>
                            <td>$ ${notebook.precio}</td>
                            <td>$ ${
                              parseFloat(notebook.precio) *
                              parseFloat(notebook.cantidad)
                            } </td>
                            <td><button class="botonSumarCarrito btn btn-outline-success" id = "${
                              notebook.id
                            }">+</button></td>
                            <td><button class="botonRestarCarrito btn btn-outline-info" id = "${
                              notebook.id
                            }" >-</i></button></td>
                            </tr>       
                              `;
  }
  carritoHtml.html(filaCarrito);
  totalFinalSumaCarrito = `
  
      <h4 class = "totalSumaC">$ ${totalSumaCarrito}</h4>  
      `;
  totalCarritoHtml.html(totalFinalSumaCarrito);
  return totalSumaCarrito;
}

function vaciarCarrito() {
  carrito.splice(0, carrito.length), mostrarCarrito();
  localStorage.removeItem("carrito");
}

const button = document.getElementById("finalizarCompra");
button.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "Proceso Finalizado",
      body: "Gracias por su compra!",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => alert(json.body));
  vaciarCarrito();
});
