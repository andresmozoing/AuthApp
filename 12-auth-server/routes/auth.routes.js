const {Router} = require('express');
const { check } = require('express-validator');
//Importo las funciones del controller
const { crearUsuario, loginUsurario, revaldiarToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//REGISTER
//router.post('/new', crearUsuario);
router.post('/new',[

    check('name','El nombre es obligatorio').not().isEmpty().isLength({min:4}),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6}),
    validarCampos
] ,crearUsuario);

//LOGIN sin middleware, para verificaciones de parametros
//router.post('/', loginUsurario);
//LOGIN con middleware, para verificaciones de parametros
router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria y debe poseer 6 caracteres').isLength({min:6}),
    validarCampos

],loginUsurario);

//VALIDAR y revalidar token
router.get('/renew',validarJWT, revaldiarToken);



module.exports = router;