const { DateTime, Date } = require("mssql")

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
    return '000000';
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