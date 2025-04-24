import { MercadoPagoConfig, Preference } from "mercadopago";  // Importamos las clases necesarias

// Inicializa la configuración del cliente de MercadoPago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,  // Asegúrate de que esta variable de entorno esté configurada
  options: { timeout: 5000 },
});

// Inicializa el objeto de preferencia
const preference = new Preference(client);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  const { price } = req.body;

  try {
    // Crear la preferencia de pago usando el método create
    const body = {
      items: [
        {
          title: "Compra Web Remerias",  // Título de la compra
          quantity: 1,                   // Cantidad de productos
          unit_price: price,             // Precio unitario
          currency_id: "ARS",            // Moneda (en este caso, pesos argentinos)
        },
      ],
      back_urls: {
        success: `${req.headers.origin}/success`,  // URL de éxito
        failure: `${req.headers.origin}/failure`,  // URL de error
        pending: `${req.headers.origin}/pending`,  // URL de pendiente
      },
      auto_return: "approved",  // Redirige automáticamente cuando se aprueba el pago
    };

    // Hacemos la solicitud para crear la preferencia
    const response = await preference.create({ body });

    // Devolvemos la respuesta con el ID de la preferencia
    return res.status(200).json({ id: response.id });
    console.log("Respuesta completa de MP:", response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Error al crear preferencia" });
  }
}
