const constantes = require('./constantes');
function valorAlicuota() {
    return constantes.alicuota
}
function nombreServicio(){
    return constantes.servicioGuardado
}
function conceptoItem() {
    return constantes.conceptoItem
}
function conceptoFactura() {
    return constantes.conceptoFactura   
}
function fechaConFormato(){
    const todaysDate = new Date()
    return todaysDate.getFullYear() //año
            + ('0' + (todaysDate.getMonth()+1)).slice(-2)//mes
            +('0' + todaysDate.getDate()).slice(-2)//dia
            +('0' + todaysDate.getHours()).slice(-2)//hora
            +('0' + todaysDate.getMinutes()).slice(-2)//minuto
            +('0' + todaysDate.getSeconds()).slice(-2);//segundo
}
function parcearFecha(date) {
    let fecha = new Date()
    var fechaFormateada = 
    fecha.getFullYear().toString() +
    fecha.getMonth().toString() +
    fecha.getDate().toString()+
    '000000'
    return fechaFormateada
}
module.exports = {
    valorAlicuota:valorAlicuota,
    nombreServicio:nombreServicio,
    conceptoItem:conceptoItem,
    conceptoFactura:conceptoFactura,
    fechaConFormato:fechaConFormato
};