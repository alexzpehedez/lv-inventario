async function login() {
  console.log("SI ENTRA AL LOGIN");
  let inputs = document.querySelectorAll("input");

  let data = {
    nombre: inputs[0].value,
    password: inputs[1].value
  };

  let res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  let resultado = await res.json();

  if (resultado.success) {
    alert("Bienvenido");
    window.location.href = "panel.html";
  } else {
    alert("Usuario o contraseña incorrectos ❌");
  }
}
function irProducto() {
  window.location.href = "producto.html";
}

function volver() {
  window.location.href = "panel.html";
}

function irCatalogo() {
  window.location.href = "catalogo.html";
}

async function guardarProducto() {
  let inputs = document.querySelectorAll("input");

  let data = {
    nombre: inputs[0].value,
    codigo: inputs[1].value,
    precio: inputs[2].value,
    cantidad: inputs[3].value,
    descripcion: document.querySelector("textarea").value
  };

  await fetch("http://localhost:3000/productos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  alert("Producto guardado en DB");
}

// BUSCADOR
document.addEventListener("DOMContentLoaded", () => {
  let search = document.querySelector(".search");

  if (search) {
    search.addEventListener("keyup", () => {
      let filtro = search.value.toLowerCase();
      let productos = document.querySelectorAll(".producto");

      productos.forEach(p => {
        let nombre = p.querySelector("h3").textContent.toLowerCase();
        p.style.display = nombre.includes(filtro) ? "block" : "none";
      });
    });
  }
});