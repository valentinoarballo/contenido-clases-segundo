const API_URL = "http://127.0.0.1:8000/articulos/"

async function obtenerArticulos() {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();

    document.getElementById("pantalla").textContent = JSON.stringify(datos, null, 2);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
  }
}

async function crearArticulo(nuevoArticulo) {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoArticulo)
    });

    const datos = await respuesta.json();
    console.log("respuesta POST: ", datos)

    obtenerArticulos()

  } catch (error) {
    console.error("Error al crear artículo:", error);
  }
}

const formularioCrear = document.getElementById("form-crear");

formularioCrear.addEventListener("submit", (e) => {
  e.preventDefault();

  const datosFormulario = {
    id: parseInt(document.getElementById("id").value),
    nombre: document.getElementById("nombre").value,
    precio: parseFloat(document.getElementById("precio").value),
    activo: document.getElementById("activo").checked
  }
  crearArticulo(datosFormulario)
})

async function editarArticulo(nuevoArticulo, id) {
  try {
    const respuesta = await fetch(`${API_URL}${id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoArticulo)
    });

    const datos = await respuesta.json();
    console.log("respuesta PUT: ", datos)

    obtenerArticulos()

  } catch (error) {
    console.error("Error al editar artículo:", error);
  }
}

async function borrarArticulo(id) {
  try {
    const respuesta = await fetch(`${API_URL}${id}/`, {
      method: "DELETE"
    });

    const datos = await respuesta.json();
    console.log("respuesta DELETE: ", datos)

    obtenerArticulos()

  } catch (error) {
    console.error("Error al borrar artículo:", error);
  }
}


async function buscarPorId() {
  const id = document.getElementById("buscar-id").value;
  if (!id) { alert("Por favor ingresa un ID"); return; }

  try {
    const respuesta = await fetch(`${API_URL}${id}/`);
    const articulo = await respuesta.json();

    document.getElementById("edit-id").value = articulo.id;
    document.getElementById("edit-nombre").value = articulo.nombre;
    document.getElementById("edit-precio").value = articulo.precio;
    document.getElementById("edit-activo").checked = articulo.activo;

  } catch (error) {
    console.error("Error al buscar artículo por ID:", error);
  }
}


function borrarDesdeBusqueda() {
  const id = document.getElementById("buscar-id").value;
  if (!id) { alert("Por favor ingresa un ID para borrar"); return; }
  
  if (confirm(`¿Estás seguro de que quieres borrar el artículo con ID ${id}?`)) {
    borrarArticulo(id)
  }
}


const formularioEditar = document.getElementById("form-editar");

formularioEditar.addEventListener("submit", (e) => {
  e.preventDefault()

  const id = parseInt(document.getElementById("edit-id").value);

  const datosFormulario = {
    nombre: document.getElementById("edit-nombre").value,
    precio: parseFloat(document.getElementById("edit-precio").value),
    activo: document.getElementById("edit-activo").checked
  }

  editarArticulo(datosFormulario, id)

})