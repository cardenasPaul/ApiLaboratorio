const { response } = require('express');
var express = require('express');
var contribuyentectr = require('../controllers/contribuyente.controller');
var logica = require('../controllers/logicaNegocio.controller')

var router = express.Router();

router.use((request,response,next)=>{
    console.log('pasando por el middleware ;)');    
    next();
})

router.route('/contribuyente').get((request,response)=>{
    contribuyentectr.getContribuyentes().then(result => {
        response.json(result[0]);
    })
})
router.route('/contribuyentes/:id').get((request,response)=>{
    contribuyentectr.getContribuyentesByCUIT(request.params.id).then(result => {
        response.json(result[0]);
    })
})

router.route('/contribuyente/buscarCUIT/:cuit').get((request,response)=>{
    contribuyentectr.findContribuyente(request.params.cuit).then(result => {
        response.json(result[0]);
    })
})

router.route('/contribuyente').post((request,response)=>{

    let contribuyente = {...request.body}
    contribuyentectr.addContribuyente(contribuyente).then(result => {
        response.status(201).json();
    })  
})

router.route('/ingresosbrutos/:id').get((request,response)=>{
    contribuyentectr.getIngBrutosByID(request.params.id).then(result => {
        if(result!=null){response.json(result[0]);}
        
    }).catch(error=>{
        response.json(null)
        console.log("No se pudieron recuperar datos." +  error)
    })
})
//logica de negocios
router.route('/altaFactura').put((request,response)=>{
    const{
        baseImponible, idContribuyente, recnoMontoProductoSaliente
    } = request.query;
    logica.registrarFactura(baseImponible,idContribuyente, recnoMontoProductoSaliente).then(result => {
        response.status(201).json();
    })
})
//obtener alicuota
router.route('/alicuota').get((request,response)=>{
    logica.obtenerAlicuota().then(result =>{
        response.json({alicuota:result})
    })
})
//obtener monto del item de ingresos brutos
router.route('/calcularMontoIIBB').get((request,response)=>{
    const{
        monto, alicuota
    } = request.query;
    logica.obtenerMnotoIIBB(alicuota, monto).then(result =>{
        response.json({monto: result})
    })
})



module.exports = router;