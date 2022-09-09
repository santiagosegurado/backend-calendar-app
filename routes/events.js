/* /api/events/*/
const { Router } = require("express");
const { 
  getEvents, 
  crearEvent,
  actualizarEvent,
  eliminarEvent } = require("../controllers/events.controller");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

// Si todas rutas usa un middlewar puedo usarlo como use
router.use(validarJWT)

router.get("/", getEvents);

router.post("/", [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
  check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
  validarCampos
], crearEvent);

router.put("/:id", actualizarEvent);

router.delete("/:id", eliminarEvent);


module.exports = router;
