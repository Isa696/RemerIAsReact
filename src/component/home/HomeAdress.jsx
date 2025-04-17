import "./HomeInfo.css";
import"./HomeAdress.css";
import "./HomeMain.css";
import {whatsAppUrl} from "../../utils/whatsAppMsg"

function HomeAdress() {
  return (
    <>

    <section className="address-container container">

    <article className="home-info">
      <div className="info-txt">
        <h2>
        Donde estamos?
        </h2>
        <p>
        Estamos en Villa Adelina, Partido de San Isidro, Buenos Aires, Argentina.📍
        </p>

      <h3>Nuestros Horarios </h3>
      <p>Lunes a Viernes<br />9:00 a 20:00</p>
      <button className="explore-clothing_btn">
        <a          href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contactarnos por WhatsApp">
        Contactanos!!!
        </a>
      </button>
                      </div>
            <div className="network-container info-txt">
            <h2>Seguinos en!!!</h2>
            <div className="networks">
              <a
                href="https://www.instagram.com/estilo.clothing/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Seguirnos en Instagram"
              >
                <img
                  src="https://img.icons8.com/color/48/000000/instagram-new.png"
                  alt="Instagram" />
              </a>
              <p>@RemerIas_ok</p>
            </div>
          </div>
        </article>

    <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26300.27423967821!2d-58.56687541927933!3d-34.51468937108782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb0a31e03db41%3A0xaf1fd10506421428!2sB1607%20Villa%20Adelina%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1742951436562!5m2!1ses!2sar"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
    </section>
    </>
  )
}

export default HomeAdress
