const { response } = require('express');
var express = require('express');
var montoController = require('../controllers/movimientoMontoEntrante.controller');

var router = express.Router();

router.use((request,response,next)=>{
    console.log('pasando por el middleware ;)');    
    next();
})

router.route('/movimientoMontoEntrante').get((request,response)=>{
        montoController.getMovimientoMontoEntrante().then(result => {
        response.json(result[0]);
    })
})

router.route('/movimientoMontoEntrante/:id').get((request,response)=>{
    montoController.getMovimientoMontoEntranteById(request.params.id).then(result => {
        response.json(result[0]);
    })
})
router.route('/movimientoMontoEntrante').post((request,response)=>{

    let monto = {...request.body}

    montoController.addMovimientoMontoEntrante(monto).then(result => {
        response.status(201).json();
    })
})

module.exports = router;