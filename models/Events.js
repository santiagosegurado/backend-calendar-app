const { Schema, model } = require("mongoose");

const EventoShema = Schema({
  title: {
    type: String,
    required: true,
  },

  notes: {
    type: String,
  },

  start: {
    type: Date,
    required: true,
  },

  end: {
    type: Date,
    required: true,
  },

  // Una referencia al Usuario que lo creo
  user: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
});

// Le digo como quiero que se vea el objeto
EventoShema.method("toJSON", function () {
  const { __v, _id, ...obj } = this.toObject();
  obj.id = _id;
  return obj;
});

module.exports = model("Evento", EventoShema);
