let notas = [
    {
        id: 1,
        titulo: "Correr",
        texto: "Tengo que correr",
        realizada: false
    },
    {
        id: 2,
        titulo: "Cenar",
        texto: "Tengo que cenar",
        realizada: true
    },
    {
        id: 3,
        titulo: "Programarr",
        texto: "Tengo que programar",
        realizada: false
    },
    {
        id: 4,
        titulo: "No olvidar cita medica",
        texto: "Cita medica, medicina general para el dia viernes",
        realizada: false
    },
]

let idGlobal = 4
let taskView = document.getElementById("div-notas")
let tachado = false
console.log(tachado)

function pintarTarjetas(array) {

    taskView.innerHTML = " "

    if (array.length == 0) {
        taskView.innerHTML = ` 
            <div> 
            <h2>No hay notas disponibles</h2>
        </div>`

    }
    else {

        for (let i = 0; i < array.length; i++) {
            if (array[i] != undefined) {
                let title = array[i].titulo;
                let descripcion = array[i].texto;
                let id = array[i].id;
                let realizada = array[i].realizada
                
                if (array[i] != undefined) {
                    if (title && descripcion) {
                        let card = document.createElement("div")
                        card.innerHTML += ` 
                    <div class="card m-5 tamañoCard" > 
                    <div class="card-body">
                    <h5 class="card-title"><input onClick="marcarRealizada('${id}')" type="checkbox" ${realizada ? "checked" : ""}> ${title}</h5>
                    <p class="card-text"> ${descripcion}</p>
                    <div class="d-flex justify-content-center">
                        <button class="btn btn-danger" onclick="deleteTask('${id}')">Borrar nota</button>
                    </div>
                    </div>
                    </div>`
                        taskView.appendChild(card)
                    }

                }
            }
        }
    }
}

pintarTarjetas(notas, taskView)

function agregarNota(titulo, texto) {

    nuevaNota = {
        id: idGlobal += 1,
        titulo: titulo,
        texto: texto,
        realizada: false
    }
    notas.push(nuevaNota)
    pintarTarjetas(notas)
}

document.getElementById("button-guardar").addEventListener("click", guardarNota);

function guardarNota() {
    let title = document.getElementById("tituloNota").value
    let descripcion = document.getElementById("descripcionNota").value

    if (title == " ") {
        alert("Estas dejando un campo vacio")
    }
    else if (descripcion == " ") {
        alert("Estas dejando un campo vacio")
    }
    else {
        agregarNota(title, descripcion)
        pintarTarjetas(notas)
    }
    limpiar()
}

function deleteTask(id) {
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id == id) {
            notas.splice(i, 1);
        }
    }
    pintarTarjetas(notas)
}
function deleteinputTasks(id) {
    let filter = filtrarRealizadas(notas)
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id == id) {
            if (filter[i].realizada == false) {
                filter.splice(i, 1);
            }
        }
    }
    pintarTarjetas(filter)
}

function limpiar() {
    document.getElementById("tituloNota").value = "";
    document.getElementById("descripcionNota").value = "";
    document.getElementById("tituloNota").focus();
}

document.getElementById("button-borrar").addEventListener("click", deleteInput);

function deleteInput() {
    pintarTarjetas(notas)
    limpiar()
}

function marcarRealizada(id) {
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id == id) {
            if (notas[i].realizada == false) {
                notas[i].realizada = true
            }
            else {
                notas[i].realizada = false
            }
        }
    }
}

document.getElementById("checkbox").addEventListener("click", checkboxFilter)

document.getElementById("search").addEventListener("keyup", checkboxFilter)

function checkboxFilter() {

    let escucharInput = document.getElementById("checkbox").checked
    let search = document.getElementById("search").value.toLowerCase()
    let filtroBusquedad = filterText(notas, search)
    for (let i = 0; i < notas.length; i++) {
        let realizada = notas[i].realizada

        if (escucharInput) {
            if (realizada) {
                let filter = filtrarRealizadas(notas)
                filtroBusquedad = filterText(filter, search)
                pintarTarjetas(filtroBusquedad)
            }
        }
        else {
            if (search.length >= 0) {
                pintarTarjetas(filtroBusquedad)
            }
        }
    }
}


function filtrarRealizadas(array) {
    let tasksFilter = []

    for (let i = 0; i < array.length; i++) {
        if (array[i].realizada == true) {
            tasksFilter.push(array[i])

        }
    }
    return tasksFilter
}

function filterText(array, texto) {

    let tasksFilter = []
    for (let i = 0; i < array.length; i++) {
        let title = array[i].titulo.toLowerCase()
        let descripcion = array[i].texto.toLowerCase()
        let textoUsuario = title.includes(texto)
        let textoUsuarioTexto = descripcion.includes(texto)
        if (textoUsuario) {
            if (textoUsuarioTexto != true) {
                tasksFilter.push(array[i])
            }
        }
        if (textoUsuarioTexto) {
            tasksFilter.push(array[i])
        }
    }
    return tasksFilter
}


