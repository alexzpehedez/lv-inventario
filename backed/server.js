const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://alejandropehedez_db_user:Alex152004@cluster0.fwgfdzd.mongodb.net/lv_inventory")
  .then(() => console.log("DB conectada"))
  .catch(err => console.log(err));

const Producto = mongoose.model("Producto", {
  nombre: String,
  codigo: String,
  precio: Number,
  cantidad: Number,
  descripcion: String
});

// GUARDAR PRODUCTO
app.post("/productos", async (req, res) => {
  const nuevo = new Producto(req.body);
  await nuevo.save();
  res.send("Producto guardado");
});

// OBTENER PRODUCTOS
app.get("/productos", async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

app.listen(3000, () => console.log("Servidor corriendo"));

const Usuario = mongoose.model("Usuario", {
  nombre: String,
  password: String
});

// LOGIN
app.post("/login", async (req, res) => {
  const { nombre, password } = req.body;

  const user = await Usuario.findOne({ nombre, password });

  if (user) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});