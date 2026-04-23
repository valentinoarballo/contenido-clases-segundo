const productos = [
  {
    id: 1,
    nombre: "Mouse 6000dpi",
    marca: "Logitech",
    categoria: "Perifericos",
    precio: 11000,
    coste: 10000,
    stock: 10,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Mouse gamer con alta precisión y diseño ergonómico."
  },
  {
    id: 2,
    nombre: "Teclado Mecánico",
    marca: "Samsung",
    categoria: "Perifericos",
    precio: 19000,
    coste: 18000,
    stock: 5,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Teclado mecánico con switches de alta calidad y retroiluminación."
  },
  {
    id: 3,
    nombre: "Monitor 24 pulgadas",
    marca: "Logitech",
    categoria: "Monitores",
    precio: 35000,
    coste: 30000,
    stock: 3,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Monitor de alta resolución con tecnología IPS y diseño moderno."
  },
  {
    id: 4,
    nombre: "Monitor 26 pulgadas",
    marca: "Samsung",
    categoria: "Monitores",
    precio: 45000,
    coste: 40000,
    stock: 2,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Monitor de alta resolución con tecnología IPS y diseño moderno."
  },
  {
    id: 5,
    nombre: "Procesor Intel i7",
    marca: "Intel",
    categoria: "Componentes",
    precio: 55000,
    coste: 45000,
    stock: 1,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Procesor de alto rendimiento para tareas exigentes."
  },
  {
    id: 6,
    nombre: "RAM 16GB DDR4",
    marca: "Kingston",
    categoria: "Componentes",
    precio: 55000,
    coste: 25000,
    stock: 5,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Memoria RAM de alta velocidad para mejorar el rendimiento del sistema."
  },
   {
    id: 7,
    nombre: "Auriculares Gamer",
    marca: "Logitech",
    categoria: "Perifericos",
    precio: 3250,
    coste: 2000,
    stock: 10,
    imagen: "https://http2.mlstatic.com/D_NQ_NP_2X_661769-MLA48244164428_112021-F.webp",
    descripcion: "Auriculares gamer con alta calidad de sonido y diseño ergonómico."
  },
]

function calcularGanancia(producto) {
  const ganancia = producto.precio - producto.coste
  return ganancia
}


const calcularGananciaArrow = (producto) => {
  return producto.precio - producto.coste
} // this es una función flecha sin nombre, también conocida como función anónima. No tiene un cuerpo definido, por lo que no realiza ninguna acción{return .


const obtenerResumen = (producto) => {
  return `Nombre: ${producto.nombre}, categoria: ${producto.categoria}, ganancia: ${calcularGanancia(producto)}`;
}

const clasificarPorGanancia = (ganancia) => {
  if (ganancia < 1500) return "Ganancia baja"
  if (ganancia <= 5000) return "Ganancia media"
  return "Ganancia alta"
}

const clasificarPorGananciaTernario = (ganancia) => {
  return ganancia < 1500
    ? "Ganancia baja"
    : ganancia <= 5000
      ? "Ganancia media"
      : "Ganancia alta"
}



const agruparPorCategoria = (productos) => {
  const resultado = {}

  productos.forEach(producto => {
    if (!resultado[producto.categoria]) {
      resultado[producto.categoria] = {
        categoria: producto.categoria,
        cantidadProductos: 0,
        gananciaTotal: 0
      };
    }

    resultado[producto.categoria].cantidadProductos++;
    resultado[producto.categoria].gananciaTotal += calcularGanancia(producto);
  })

  return resultado;
}



const agruparPor = (array, clave) => {
  const resultado = {};

  array.forEach((item) => {
    const valorClave = item[clave];

    if (!resultado[valorClave])
      resultado[valorClave] = {
        [clave]: valorClave,
        cantidadProductos: 0,
        gananciaTotal: 0
      };

    resultado[valorClave].cantidadProductos++;
    resultado[valorClave].gananciaTotal += calcularGanancia(item);
  });

  return resultado;
}

const resultado = agruparPor(productos, "categoria");
const resultadoM = agruparPor(productos, "marca");
console.log(resultado);
console.log(resultadoM);