
// let nombre = "Valentino";
// var edad = 23;
// const dni = 44372000;

// if (edad > 18) { 
//     let apellido = "arballo";
//     console.log(nombre);
//     console.log(apellido);
// }


const nombre = prompt("Ingrese su nombre");
const edad = parseInt(prompt("Ingrese su edad"));
const cantidadEntradas = parseInt(prompt("Ingrese la cantidad de entradas que desea comprar"));

console.log("Datos ingresados:");
console.log(nombre, edad, cantidadEntradas);

if (nombre === "") {
  console.log("El nombre no puede estar vacío.");
} else if (edad < 18) {
  console.log("Lo siento, no puedes comprar entradas para menores de edad.");
} else if (cantidadEntradas <= 0) {
  console.log("No has seleccionado ninguna entrada.");
} else {

  console.log("Compra Válida")
  const precioEntrada = 1000;

  let total = precioEntrada * cantidadEntradas;
  console.log("Total a pagar: $" + total)

  total = total + 500
  console.log("Total con recargo: $" + total)

  console.log(`Hola ${nombre}!!, su compra de ${cantidadEntradas} entradas por $${precioEntrada} c/u ha sido procesada. El total a pagar es: $${total}`)

}

