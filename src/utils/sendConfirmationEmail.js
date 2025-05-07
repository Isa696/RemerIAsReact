import toast from "react-hot-toast";

const sendConfirmationEmail = async () => {
    try {
      const response = await fetch('/api/sendMail', {
        method: 'POST',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Correo enviado:', data);
        toast.success('Correo de confirmación enviado.');
      } else {
        console.error('Error al enviar correo:', data);
        toast.error('Hubo un problema al enviar el correo.');
      }
    } catch (error) {
      console.error('Error en la petición:', error);
      toast.error('Error inesperado al enviar el correo.');
    }
  };

  export default sendConfirmationEmail;