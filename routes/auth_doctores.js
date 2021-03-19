/*
    path: api/login/doctores

*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearDoctor, login, renewToken } = require('../controllers/auth_doctores');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();



router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
    validarCampos
], crearDoctor );

router.post('/', [
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('email','El correo es obligatorio').isEmail(),
], login );


router.get('/renew', validarJWT, renewToken );

module.exports = router;
