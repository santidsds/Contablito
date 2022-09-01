
let descripcion = document.getElementById("descripcion");
let compraVenta = document.getElementsByName("compraventa")
let iva = document.getElementsByName("iva");
let subtotal = document.getElementById("subtotal");
let totalCompra = document.getElementById("total-compra");
let totalVenta = document.getElementById("total-venta");
let tableBody = document.getElementById("table-body");
let alerta = document.getElementById("alerta");

let submitBtn = document.getElementById("submit-btn")


let compras = 0
let ventas = 0

console.log(!(compraVenta[0].checked && compraVenta[1].checked))

submitBtn.addEventListener("click", () => {
    
    if(descripcion.value.length === 0 || !(compraVenta[0].checked || compraVenta[1].checked) || !(iva[0].checked || iva[1].checked || iva[2].checked) || subtotal.value.length === 0){
        alerta.innerHTML = `
        Ningún campo debe quedar vacio
        `
    } else {

    alerta.innerHTML = ""
    
    tableBody.innerHTML += `
    <th>${descripcion.value}</th>
    <th>${tipoTransaccion()}</th>
    <th>$${subtotal.value}</th>
    <th>${ivaDelSubtotal()}</th>
    <th>$${total()}</th>
    `
    
    compras += totalCompras();
    ventas += totalVentas();

    totalCompra.innerHTML = `
    Total Compras: $${compras}
    `
    totalVenta.innerHTML = `
    Total Ventas: $${ventas}
    `
    }
    
})

function tipoTransaccion () {

    if (compraVenta[0].checked){
        return compraVenta[0].value;
    }
    else if(compraVenta[1].checked){
        return compraVenta[1].value;
    } else {
        return null
    }

}

function tipoIva () {

    if (iva[0].checked){
        return iva[0].value;
    }
    else if(iva[1].checked){
        return iva[1].value;
    }
    else if(iva[2].checked){
        return iva[2].value;
    } 
    else {
        return null
    }

}

function totalVentas (){
    let ventas = 0
    if (tipoTransaccion() === "venta"){
        ventas += total();
        
    }
    return ventas;
}

function totalCompras (){
    let compras = 0
    if (tipoTransaccion() === "compra"){
        compras += total();
        
    }
    return compras;
}

function total (){
    return parseInt(ivaDelSubtotal()) + parseInt(subtotal.value);
}

function ivaDelSubtotal () {
    return calcIva(subtotal.value,tipoIva())
}

function calcIva (subtotal, iva) {
    let x = 0;
    if (iva === "basico"){
        x = 0.22
        return subtotal * x;
    }
    else if(iva === "minimo" ){
        x = 0.10
        return subtotal * x;
    }
    else if(iva === "extento" ){
        return 0;
    }
}