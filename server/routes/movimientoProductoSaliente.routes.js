const { response } = require('express');
var express = require('express');
var movimientoProductoSalienteController = require('../controllers/movimientoProductoSaliente.controller');

var router = express.Router();

router.use((request,response,next)=>{
    console.log('pasando por el middleware ;)');    
    next();
})
//GET
router.route('/movimientoProductoSaliente').get((request,response)=>{
    movimientoProductoSalienteController.getMovimientoProductoSaliente().then(result => {
        response.json(result[0]);
    })
})
router.route('/movimientoProductoSaliente/:id').get((request,response)=>{
    movimientoProductoSalienteController.getMovimientoProductoSalienteById(request.params.id).then(result => {
        response.json(result[0]);
    })
})
//PUT
router.route('/movimientoProductoSaliente/update').put((request,response)=>{
    const{
        recno,
        baseImponible,
        fechaDeclaracion,
        cabeceraOriginante
    } = request.query;
    console.log(request.query)
    movimientoProductoSalienteController.updateMovimientoProductoSaliente(
        recno,
        baseImponible,
        fechaDeclaracion,
        cabeceraOriginante
    ).then(result => {
        response.status(201).json();
    })
})
//POST
router.route('/movimientoProductoSaliente').post((request,response)=>{

    let producto = {...request.body}

    movimientoProductoSalienteController.addMovimientoProductoSaliente(producto).then(result => {
        response.status(201).json();
    })
})

module.exports = router;