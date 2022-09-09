const jwt = require('jsonwebtoken');


const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {

    const payload = { name, uid };

    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2H'
    }, (err, token) => {

      if (err) {
        console.log(err);
        reject("No se pudo gernerar el Token");
      }
      
      resolve(token);
      
    });
  })
}



module.exports = {
  generarJWT
}