import "./HomeInfo.css";
import"./HomeAdress.css";
import "./HomeMain.css";

function HomeAdress() {
  return (

    <section className="address-container container">

    <article className="home-info">
      <div className="info-txt">
        <h2>
        Donde estamos?
        </h2>
        <p>
        Ubicada sobre la avenida principal del centro comercial del barrio “Las tunas”. <br /><br />📍Av. Constituyentes 3142, General Pacheco, Tigre.
        </p>
      </div>
      <button className="explore-clothing_btn">
        <a href="">
        Contactanos
        </a>
      </button>
        </article>

    <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3290.151233517665!2d-58.6729895!3d-34.4483087!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bca3bda76a52cd%3A0x4d0b0310a6654157!2zU2FudGVyw61hIEVsIFBhcmHDrXNv!5e0!3m2!1ses!2sar!4v1739999527770!5m2!1ses!2sar"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

    </section>
  )
}

export default HomeAdress
