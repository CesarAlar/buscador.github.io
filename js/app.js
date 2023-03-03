const marca = document.getElementById('marca');
const modelo = document.getElementById('modelo');
const puertas = document.getElementById('puertas');
const transmision = document.getElementById('transmision');
const precio = document.getElementById('precio');
const color = document.getElementById('color');
const year = document.getElementById('year');
const minimo = document.getElementById('minimo');
const maximo = document.getElementById('maximo');


const resultado = document.getElementById('resultado');
const max = new Date().getFullYear()
const min = max - 10;

const busqueda = {
    marca : '',
    minimo : '',
    year : '',
    puertas : '',
    transmision : '',
    maximo : '',
    color : ''
}
document.addEventListener("DOMContentLoaded", (first) => { 
    mostrarAutos(autos);    
    llenarSelect();
})
marca.addEventListener('change', e => { 
    busqueda.marca = e.target.value;
    filtrarAuto();    
})
year.addEventListener('change', e => { 
    busqueda.year = Number(e.target.value);
    filtrarAuto();    
})
color.addEventListener('change', e => { 
    busqueda.color = e.target.value   
    filtrarAuto()
})
puertas.addEventListener('change', e => { 
    busqueda.puertas = Number(e.target.value);  
    filtrarAuto()  
})
transmision.addEventListener('change', e => { 
    busqueda.transmision = e.target.value;
    filtrarAuto()    
})
minimo.addEventListener('change', e => { 
    busqueda.minimo = Number(e.target.value);
    filtrarAuto()    
})
maximo.addEventListener('change', e => { 
    busqueda.maximo = Number(e.target.value);
    filtrarAuto()    
})

function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: ${precio} - Color: ${color}
        `
        resultado.appendChild(autoHTML)
    });
}

function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}

function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('option');
        opcion.value= i;
        opcion.textContent = i;
        year.appendChild(opcion)
    }
}

function filtrarAuto() {
    const res = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor).filter(filtrarMin).filter(filtrarMax)

    if (res.length) {
        mostrarAutos(res);    
    }else{
        sinResultados();
    }
    
}
function sinResultados() {
    limpiarHTML()
    const noRes = document.createElement('div');
    noRes.classList.add('alerta', 'error');
    noRes.textContent = 'No hay resultados';    
    resultado.appendChild(noRes)
}
function filtrarMarca(auto) {
    const {marca} = busqueda;
    if (marca) {
        return auto.marca === marca;
    }

    return auto;
}
function filtrarYear(auto) {
    const {year} = busqueda;
    if (year) {
        return auto.year === year;
    }
    return auto
}
function filtrarPuertas(auto) {
    const {puertas} = busqueda;
    if (puertas) {
        return auto.puertas === puertas;
    }
    return auto
}
function filtrarTransmision(auto) {
    const {transmision} = busqueda;
    if (transmision) {
        return auto.transmision === transmision;
    }
    return auto
}
function filtrarColor(auto) {
    const {color} = busqueda;
    if (color) {
        return auto.color === color;
    }
    return auto
}
function filtrarMin(auto) {
    const {minimo} = busqueda;
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto
}
function filtrarMax(auto) {
    const {maximo} = busqueda;
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto
}