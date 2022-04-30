const { response } = require('express');
var express = require('express');
var ItemVentasController = require('../controllers/itemVentas.controller');

var router = express.Router();

router.use((request,response,next)=>{
    console.log('pasando por el middleware ;)');    
    next();
})

router.route('/itemVentas').get((request,response)=>{
    ItemVentasController.getItemVentas().then(result => {
        response.json(result[0]);
    })
})

router.route('/itemVentas/:id').get((request,response)=>{
    ItemVentasController.getItemVentasById(request.params.id).then(result => {
        response.json(result[0]);
    })
})
router.route('/itemVentas').post((request,response)=>{

    let item = {...request.body}

    ItemVentasController.addItemVentas(item).then(result => {
        response.status(201).json();
    })
})

module.exports = router;