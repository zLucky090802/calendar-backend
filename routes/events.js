const { Router } = require("express");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos');
const { isDate } = require("../helpers/isDate");
const router = Router();



//todas pasan por la validacion jwt
router.use( validarJWT )

//obtener eventos 
router.get(
    '/',
   
    getEventos
)

//Crear un nuevo evento
router.post('/', [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check('start', 'Fecha de inicio es obligatorio').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
    validarCampos
  ], 
  crearEvento
)

//actualizar Evento
router.put('/:id',[
  check("title", "El titulo es obligatorio").not().isEmpty(),
  check('start', 'Fecha de inicio es obligatorio').custom(isDate),
  check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
  validarCampos
],
actualizarEvento
)

//borrar evento
router.delete('/:id', eliminarEvento)

module.exports = router;
