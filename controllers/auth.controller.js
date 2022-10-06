const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });

    // Validacion del Email
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Un usuario ya existe con ese correo",
      });
    }

    // Creacion del usuario
    usuario = new Usuario(req.body);

    // Generar token
    const token = await generarJWT(usuario.id, usuario.name)

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password);

    // Guardar en DB
    await usuario.save();

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
  } catch (error) {

    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const loginUsuario = async(req, res) => {
  const { email, password } = req.body;

  try {
    
    // Verificar que el email exista
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe ",
      });
    }

    // Verificar que sea la misma contraseña 
    const validPassword = bcrypt.compareSync(password, usuario.password)

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no valida"
      })
    }

    // Si todo sale bien genero el JSON Web Token
    const token = await generarJWT(usuario.id, usuario.name)


    // Respuesta
    res.status(202).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }


  
};

const revalidarToken = async(req, res) => {

  const uid = req.uid;
  const name = req.name;
  
  
  try {
    // Genero un nuevo token
    const token = await generarJWT(uid, name)
    
    res.json({
      ok: true,
      uid, 
      name,
      token
    });
    
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Token no fue revalidado"
    })
  }

};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
