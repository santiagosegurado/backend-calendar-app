const { Router } = require("express");
const router = Router();
const {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} = require("../controllers/auth.controller");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

// Ruta /api/auth/...

// Registra un nuevo usuario
// El segundo argumento es un middleware
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password tiene que ser de 6 caracteres").isLength({min:6}),
    validarCampos
  ], 
  crearUsuario
);

// Logeo un nuevo usuario
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password tiene que ser de 6 caracteres").isLength({min:6}),
    validarCampos
  ], 
  loginUsuario
);

// Renuevo el token
router.get("/renew",validarJWT , revalidarToken);

module.exports = router;
