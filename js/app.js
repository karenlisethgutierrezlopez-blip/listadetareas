const formulario = document.getElementById("formtarea");
const input = document.getElementById("inputtarea");
const error = document.getElementById("mensajeerror");
const lista = document.getElementById("listatareas");
const mensajeVacio = document.getElementById("vacio");

const total = document.getElementById("total");
const completadas = document.getElementById("completadas");
const pendientes = document.getElementById("pendientes");
const barra = document.getElementById("barraprogreso");

let tareas = [];
let idTarea = 1;

function agregarTarea(texto) {
    const nuevaTarea = {
        id: idTarea,
        texto: texto,
        completada: false
};

  tareas.push(nuevaTarea);
    idTarea++;
    mostrarTareas();
}

function completarTarea(id) {
    const tarea = tareas.find(t => t.id === id);

    if (tarea) {
        tarea.completada = true;
        mostrarTareas();
    }
}

function eliminarTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    mostrarTareas();
}

function crearTarea(tarea) {
    const elemento = document.createElement("li");
    elemento.className = "tarea";

    if (tarea.completada) {
        elemento.classList.add("completada");
    }

      const texto = document.createElement("span");
    texto.className = "texto";
    texto.textContent = tarea.texto;

    const botones = document.createElement("div");
    botones.className = "acciones";

    const btnCompletar = document.createElement("button");
    btnCompletar.className = "btn btn-completar";
    btnCompletar.textContent = "Completar";
    btnCompletar.type = "button";
    btnCompletar.disabled = tarea.completada;

    btnCompletar.addEventListener("click", function () {
        completarTarea(tarea.id);
    });

     const btnEliminar = document.createElement("button");
    btnEliminar.className = "btn btn-eliminar";
    btnEliminar.textContent = "Eliminar";
    btnEliminar.type = "button";

    btnEliminar.addEventListener("click", function () {
        eliminarTarea(tarea.id);
    });

      botones.appendChild(btnCompletar);
    botones.appendChild(btnEliminar);

    elemento.appendChild(texto);
    elemento.appendChild(botones);

    return elemento;
}

function actualizarContadores() {
    const cantidadTotal = tareas.length;
    const cantidadCompletadas = tareas.filter(t => t.completada).length;

    total.textContent = cantidadTotal;
    completadas.textContent = cantidadCompletadas;
    pendientes.textContent = cantidadTotal - cantidadCompletadas;

    let progreso = 0;

    if (cantidadTotal > 0) {
        progreso = (cantidadCompletadas / cantidadTotal) * 100;
    }

    barra.style.width = progreso + "%";
}

function mostrarTareas() {
    lista.innerHTML = "";

    tareas.forEach(function (tarea) {
        lista.appendChild(crearTarea(tarea));
    });

    mensajeVacio.style.display = tareas.length === 0 ? "block" : "none";

    actualizarContadores();
}

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const texto = input.value.trim();

    if (texto === "") {
        error.textContent = "Escribe una tarea antes de agregarla.";
        return;
    }

    error.textContent = "";
    agregarTarea(texto);
    input.value = "";
});

input.addEventListener("input", function () {
    error.textContent = "";
});

mostrarTareas();