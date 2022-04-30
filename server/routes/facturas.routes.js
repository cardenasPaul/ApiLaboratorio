const { response } = require('express');
var express = require('express');
var facturasctr = require('../controllers/facturas.controller');

var router = express.Router();

router.use((request,response,next)=>{
    console.log('pasando por el middleware ;)');    
    next();
})

router.route('/facturas').get((request,response)=>{
    facturasctr.getFacturas().then(result => {
        response.json(result[0]);
    })
})

router.route('/facturas/:id').get((request,response)=>{
    facturasctr.getFacturasById(request.params.id).then(result => {
        response.json(result[0]);
    })
})

router.route('/facturas').post((request,response)=>{

    let factura = {...request.body}
    console.log(factura)

    facturasctr.addFactura(factura).then(result => {
        response.status(201).json();
    })
})

module.exports = router;
