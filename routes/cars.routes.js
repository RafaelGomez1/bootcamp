/// ARCHIVO DE RUTAS ESTANDAR

const express = require('express')
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Car = require('../models/cars.models');


router.get('/', async(req, res) => {
    const cars = await Car.find()
    res.send(cars);
})

router.get('/:id', async(req, res) => {
    const car = await Car.findById({ _id: req.params.id })
    if (!car) return res.status(404).send('No encontrado :C')
    res.status(200).send(car);
})

router.post('/', [
    check('company').isLength({ min: 2 }),
    check('model').isLength({ min: 2 })
], async(req, res) => {
    
    // Controller
    /* 
        Recibe la peticion  los datos y los envia al service
        Gestion de errores y codigos de HTTP
    */ 
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    
    res.status(201).send(result);
    
    // Service
    
    /*
        Assert Preconditions on all data
        Recibe como parametros de metodo 
           - Company
           - Model
           - Year
           - Sold
           - Price
           - Extras
           
       Crea un nuevo Car (buscar como implementar Factory Method)
       Llamar al CarRepository para hacer un save
    */
    
     const car = new Car({
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
    });

    const result = await car.save();

    // Repository
    
    /*
        Recibe los datos necesaria y utilizando los metodos de mongoose persiste los datos
    */
})

router.put('/:id', [
    check('company').isLength({ min: 3 }),
    check('model').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    const coche = await Car.findByIdAndUpdate(req.params.id, {
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
    }, {
        new: true
    });
    if (!coche) {
        return res.status(404).send('coche no encontrado');
    }
    res.status(204).send(coche);
})

router.delete('/:id', async(req, res) => {

    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
        return res.status(404).send('coche no encontrado');
    } else {
        res.status(200).send('Coche Borrado');
    }
})

module.exports = router;
