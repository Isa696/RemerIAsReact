export default async function handler(req, res) {
    // 1️⃣ Solo permitimos POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }
  
    // 2️⃣ Leemos la API Key de Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      return res.status(500).json({ error: "Falta RESEND_API_KEY en variables de entorno" });
    }
  
    // 3️⃣ Extraemos el HTML dinámico del body
    const { html } = req.body;
    if (!html) {
      return res.status(400).json({ error: "Falta el contenido HTML en el body" });
    }
  
    try {
      // 4️⃣ Hacemos la llamada a Resend
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from:    "RemerIAs <onboarding@resend.dev>",
          to:      ["isaias69696@gmail.com"],   // Podés también hacerlo dinámico si lo necesitás
          subject: "Nueva compra RemerIAs",
          html,                                  // Aquí va el HTML que envía el frontend
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        return res.status(200).json(data);
      } else {
        console.error("Error al enviar correo:", data);
        return res.status(500).json({ error: "Error al enviar correo", details: data });
      }
    } catch (err) {
      console.error("Error al llamar a Resend:", err);
      return res.status(500).json({ error: "Error al llamar a Resend", details: err.message });
    }
  }
  