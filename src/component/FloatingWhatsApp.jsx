import { WhatsappLogo } from "phosphor-react";
import { useEffect, useState } from "react";
import "./FloatingWhatsApp.css";

function FloatingWhatsApp() {

    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Mostrar el tooltip después de que el componente se monte
        setShowTooltip(true);
        
        // Ocultar el tooltip después de 3 segundos
        const timer = setTimeout(() => {
            setShowTooltip(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);
    const phoneNumber = "+541136945870";
    const message = "Hola!🌟 Vengo del sitio Web.✨ Quiero hacer una consulta 😊";
    const encodedMessage = encodeURIComponent(message);
    
    // Detectar si es móvil o desktop
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
        ? `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    return (
        <div className="whatsapp-container">
        {showTooltip && (
            <div className="whatsapp-tooltip">
                Chatea con nosotros 😁
            </div>
        )}
        <a
            href={url}
            className="floating-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contactarnos por WhatsApp"
        >
            <WhatsappLogo size={32} weight="regular" />
        </a>
        </div>
    );
}

export default FloatingWhatsApp;