/*
    path: api/doctores

*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getDoctores } = require('../controllers/doctores');

const router = Router();


router.get('/', validarJWT, getDoctores );

module.exports = router;
