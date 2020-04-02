const express = require('express');

let app = express();
// SDK de Mercado Pago
const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: 'TEST-1348470960755349-032502-c23d4dc6548788f88570d75a94138321-328567421'
});
let Compra = require('../models/compra');

app.post('/api/mercado-pago/ipn', (req, res) => {
  console.log('entro');
  if (req.body.action === 'payment.created') {
    const id_pago = req.body.data['id'];
    mercadopago.payment.get(id_pago).then(pay => {
      mercadopago.merchant_orders.get(pay.body.order.id).then(resp => {
        mercadopago.preferences.get(resp.body.preference_id).then(pref => {
          console.log('entro');
          let compra = new Compra({
            objeto: pay.body
          });
          compra.save((err, compraDB) => {
            if (err) {
              return res.status(500).json({
                ok: false,
                err
              });
            }
            if (!compraDB) {
              return res.status(400).json({
                ok: false,
                err
              });
            }
            res.json({
              ok: true,
              compra: compraDB
            });
          });
          res.json({ pay });
          // Compra.update(
          //   { estado: "Pagado" },
          //   {
          //     where: {
          //       id_preference: pref.body.id
          //     }
          //   }
          // ).then(() => {
          //   console.log("Pago actualizado correctamente");
          //   options.url += `${datos.id_usuario}/${datos.id_factura}/pagado`;
          //   request(options, (error, response, body) => {
          //     if (!error && response.statusCode == 200) {
          //       // res.send(JSON.parse(body));
          //       console.log("entro al ws");
          //       res.redirect(ip_server + ":" + port_server);
          //     } else {
          //       console.log("no entro al ws");
          //     }
          //   });
          // });
        });
      });
    });
  }
  res.send({ ok: 'si' }, 200);
});

module.exports = app;
