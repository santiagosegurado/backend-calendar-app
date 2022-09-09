const Evento = require('../models/Events');


const getEvents = async(req, res) => {

  const event = await Evento.find().populate('user', 'name')

  res.json({
    ok: true,
    event
  });
};

const crearEvent = async(req, res) => {

  // const { title, start, end } = req.body;

  const evento = new Evento(req.body);

  try {
    // Agrego al User que viene el request 
    evento.user = req.uid;
    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado, 
      msg: "Evento guardado correctamente"
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false,
      msg: "Hable con el admin"
    })
  }

};
const actualizarEvent = async(req, res) => {
  const { id } = req.params;

  const uid = req.uid

  try {
    // Busco el evento con ese id
    const event = await Evento.findById(id);

    // Verifico si existe
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe evento con ese id"
      })
    }

    // Verifico que la persona que lo va a editar sea la misma que lo creo 
    if (event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no esta autorizado a modificar el evento"
      })
    }

    // Si llego hasta aca es que es el mismo usuario y esta todo bien
    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(id, nuevoEvento, {new:true})
    
    res.json({
      ok: true,
      evento: eventoActualizado, 
      msg: "Evento actualiado correctamente"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false,
      msg: "Hable con el admin"
    })
  }
};
const eliminarEvent = async(req, res) => {
  const { id } = req.params;
  const uid = req.uid

  try {
    // Busco el evento con ese id
    const event = await Evento.findById(id);

    // Verifico si existe
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: "No existe evento con ese id"
      })
    }

    // Verifico que el usuario este autorizado 
    if (event.user.toString() != uid) {
      return res.status(401).json({
        ok: false,
        msg: "El usuario no esta autorizado a eliminar el evento"
      })
    }

    const eventoEliminado = await Evento.findByIdAndDelete(id);
    
    res.json({
      ok: true,
      evento: eventoEliminado, 
      msg: "Evento eliminado correctamente"
    });

    
  } catch (error) {
    console.log(error);
    res.status(500).json({ 
      ok: false,
      msg: "Hable con el admin"
    })
  }


  res.json({
    ok: true,
    msg: "Ruta eliminarEvent",
    id,
  });
};

module.exports = {
  getEvents,
  crearEvent,
  actualizarEvent,
  eliminarEvent,
};
