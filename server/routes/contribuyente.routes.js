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

router.route('/contribuyente/buscarId/:id').get((request,response)=>{
    contribuyentectr.getContribuyentesById(request.params.id).then(result => {
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
//logica de negocios
router.route('/altaFactura').put((request,response)=>{
    const{
        baseImponible, idContribuyente, recnoMontoProductoSaliente
    } = request.query;
    logica.registrarFactura(baseImponible,idContribuyente, recnoMontoProductoSaliente).then(result => {
        response.status(201).json();
    })
})


module.exports = router;