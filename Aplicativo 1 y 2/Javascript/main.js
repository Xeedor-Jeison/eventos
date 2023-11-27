let inputEstatura = document.getElementById("estatura-centimetros")
let valorEstatura
let operacion
inputEstatura.addEventListener("keyup", (e) => {
    valorEstatura = parseFloat(Math.pow(parseInt(e.target.value) / 100, 2).toFixed(2))
})


let inputPesoKg = document.getElementById("peso-kg")
let pesoKg
inputPesoKg.addEventListener("keyup", e => {
    pesoKg = parseFloat(e.target.value)
    operacion = parseFloat((pesoKg/valorEstatura).toFixed(2))
    let boton =document.getElementById("boton")
    boton.addEventListener("click", e => {
        document.getElementById("result").value=operacion
    })
    
})



//Aplicacion 2 
let monedaCop = 4067.81
let monedaUsd = 0.00025
let valorMuestraUsd=1
document.querySelector("#usd").value=valorMuestraUsd
document.querySelector("#cop").value=monedaCop

document.querySelector("#cop").addEventListener("keyup",e => {
    let escrito = Number(e.target.value)
    let resultado = parseFloat((escrito * monedaUsd).toFixed(2))
    console.log(resultado)
    document.querySelector("#usd").value=resultado
});
document.querySelector("#usd").addEventListener("keyup",e => {
    let escrito = Number(e.target.value)
    let resultado = parseFloat((escrito * monedaCop).toFixed(2))
    document.querySelector("#cop").value=resultado
});




