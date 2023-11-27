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
]

let idGlobal = 3
let taskView = document.getElementById("div-notas")

function pintarTarjetas(array, divPrincipal) {

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
                        divPrincipal.appendChild(card)
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
    pintarTarjetas(notas, taskView)
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
        pintarTarjetas(notas, taskView)
    }
    limpiar()
}

function deleteTask(id) {
    for (let i = 0; i < notas.length; i++) {
        if (notas[i].id == id) {
            notas.splice(i, 1);
        }
    }
    pintarTarjetas(notas, taskView)
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
    pintarTarjetas(filter, taskView)
}

function limpiar() {
    document.getElementById("tituloNota").value = "";
    document.getElementById("descripcionNota").value = "";
    document.getElementById("tituloNota").focus();
}

document.getElementById("button-borrar").addEventListener("click", deleteInput);

function deleteInput() {
    pintarTarjetas(notas, taskView)
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

document.getElementById("checkbox").addEventListener("click", filtrosGeneral)

function checkboxFilter() {
    let escucharInput = document.getElementById("checkbox").checked
    if (escucharInput == true) {
        let filter = filtrarRealizadas(notas)
        pintarTarjetas(filter, taskView)
    }
    else {
        pintarTarjetas(notas, taskView)
    }
    
}
function filtrosGeneral(){
    let escucharInput = document.getElementById("checkbox").checked
    let search = document.getElementById("search").value.toLowerCase()
    console.log(search.length)

    if(escucharInput == true && search.length == 0){
        checkboxFilter()
    }
    if (escucharInput == true && search.length > 0) {
        filtro()
        checkboxFilter()
        
    }
    if (escucharInput == false && search.length == 0) {
        pintarTarjetas(notas,taskView)
    }
    if (escucharInput == false && search.length > 0) {
        filtro()
    }
}

function filtrarRealizadas(array) {
    let tasksFilter = []

    for (let i = 0; i < array.length; i++) {
        if (array[i].realizada == true) {
            tasksFilter.push(array[i])
            console.log(tasksFilter)
        }
    }
    return tasksFilter
}


document.getElementById("search").addEventListener("keyup", filtrosGeneral)

function filtro() {
    let search = document.getElementById("search").value.toLowerCase()
    let filtroBusquedad = filterText(notas, search)
    
    if(filtroBusquedad == 0){
        pintarTarjetas(notas,taskView)
    }
    else{
        pintarTarjetas(filtroBusquedad,taskView)
    }
}

function filterText(array, texto) {
    let tasksFilter = []
    for (let i = 0; i < array.length; i++) {
        let data = Object.values(array[i].titulo)
        let newString = data.toString().toLowerCase()
        let newData = newString.replaceAll(",", "")
        newData = newData.split(" ")
        let datoUsuario = newData.includes(texto)

        let data2 = Object.values(array[i].texto)
        let newString2 = data2.toString().toLowerCase()
        let newData2 = newString2.replaceAll(",", "")
        newData2 = newData2.split(" ")
        let datoUsuario2 = newData2.includes(texto)


        if (datoUsuario) {
            if (datoUsuario2 != true) {
                tasksFilter.push(array[i])
            }

        }
        if (datoUsuario2 == true) {
                tasksFilter.push(array[i])

        }

    }

    return tasksFilter
}


