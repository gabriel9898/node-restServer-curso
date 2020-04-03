const express = require('express');

let { verificarToken } = require('../middlewares/auntenticacion');

let app = express();
let Producto = require('../models/producto');

//=========================
// Obtener productos
//=========================
app.get('/productos', verificarToken, (req, res) => {
  let desde = req.query.desde || 0;
  desde = Number(desde);
  Producto.find({ disponible: true })
    .skip(desde)
    .limit(5)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      res.status(201).json({
        ok: true,
        productos: productos
      });
    });
});

//=========================
// Obtener un producto por ID
//=========================
app.get('/productos/:id', verificarToken, (req, res) => {
  let id = req.params.id;

  Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, productoDB) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      if (!productoDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'ID no existe'
          }
        });
      }
      res.status(201).json({
        ok: true,
        producto: productoDB
      });
    });
});

//=========================
// Buscar productos
//=========================
app.get('/productos/buscar/:termino', verificarToken, (req, res) => {
  let termino = req.params.termino;

  let regex = new RegExp(termino, 'i'); //i para q sea insencible con las matusculas y minusculas
  Producto.find({ nombre: regex })
    .populate('categoria', 'descripcion')
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      res.status(201).json({
        ok: true,
        producto: productos
      });
    });
});
//=========================
// Crear nueva producto
//=========================
app.post('/productos', verificarToken, (req, res) => {
  let body = req.body;
  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precioUni,
    descripcion: body.descripcion,
    disponible: body.disponible,
    categoria: body.categoria,
    usuario: req.usuario._id
  });

  producto.save((err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    res.status(201).json({
      ok: true,
      producto: productoDB
    });
  });
});

//=========================
// Modifica producto
//=========================
app.put('/productos/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  let body = req.body;

  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    if (!productoDB) {
      return res.status(500).json({
        ok: false,
        err: {
          message: 'El ID no existe'
        }
      });
    }
    productoDB.nombre = body.nombre;
    productoDB.precioUni = body.precioUni;
    productoDB.categoria = body.categoria;
    productoDB.disponible = body.disponible;
    productoDB.descripcion = body.descripcion;
    productoDB.save((err, productoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      res.json({
        ok: true,
        producto: productoGuardado
      });
    });
  });
});

//=========================
// Eliminar producto
//=========================
app.delete('/productos/:id', verificarToken, (req, res) => {
  let id = req.params.id;
  Producto.findById(id, (err, productoDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    if (!productoDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Id no existe'
        }
      });
    }
    productoDB.disponible = false;
    productoDB.save((err, productoBorrado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      res.status(201).json({
        ok: true,
        producto: productoBorrado,
        mensaje: 'Producto Borrado'
      });
    });
  });
});

module.exports = app;
