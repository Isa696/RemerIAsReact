import { WhatsappLogo } from "phosphor-react";
import { useEffect, useState } from "react";
import "./FloatingWhatsApp.css";
import { whatsAppUrl } from "../utils/whatsAppMsg";

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

    return (
        <div className="whatsapp-container">
        {showTooltip && (
            <div className="whatsapp-tooltip">
                Chatea con nosotros 😁
            </div>
        )}
        <a
            href={whatsAppUrl}
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