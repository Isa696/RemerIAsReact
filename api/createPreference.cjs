
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN, // Variable sin VITE_ y oculta al frontend
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { price } = req.body;

  try {
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: "Compra Web Remerias",
          quantity: 1,
          unit_price: price,
          currency_id: "ARS",
        },
      ],
      back_urls: {
        success: `${req.headers.origin}/success`,
        failure: `${req.headers.origin}/failure`,
        pending: `${req.headers.origin}/pending`,
      },
      auto_return: "approved",
    });

    return res.status(200).json({ id: preference.body.id });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al crear preferencia" });
  }
};
