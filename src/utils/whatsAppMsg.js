const phoneNumber = "+541133876028";
    const message = "Hola!🌟 Vengo del sitio Web.✨ Quiero hacer una consulta 😊";
    const encodedMessage = encodeURIComponent(message);

    // Detectar si es móvil o desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    export const whatsAppUrl = isMobile
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;