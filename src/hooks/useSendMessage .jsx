import { useState } from 'react';
import toast from 'react-hot-toast';


const useSendMessage = () => {
  const [loadingMsg, setLoadingMsg] = useState(false);

  const sendMessage = async () => {

    const phoneNumberId = import.meta.env.VITE_PHONE_NUMBER_ID;
    const accessToken = import.meta.env.VITE_WHATSAPP_TOKEN;
    setLoadingMsg(true);

    const apiUrl = `https://graph.facebook.com/v22.0/${phoneNumberId}/messages`;

    const payload = {
      messaging_product: 'whatsapp',
      to: '541133876028',
      type: 'template',
      template: {
        name: 'hello_world',  // Usa una plantilla aprobada en tu cuenta de WhatsApp Cloud API
        language: { code: 'en_US' }
      }
    };
    console.log('Payload:', JSON.stringify(payload));
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje: ' + response.statusText);
      }

      const data = await response.json();
      console.log('Mensaje enviado:', JSON.stringify(data, null, 2));
      toast.success('Mensaje enviado con éxito');
    } catch (err) {
      console.error(err);
      toast.error('Error al enviar el mensaje');
    } finally {
      setLoadingMsg(false);
    }
  };

  return { sendMessage, loadingMsg };
};

export default useSendMessage;
