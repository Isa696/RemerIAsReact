const BusinessPolicies = () => {
  return (
    <div
      className="container"
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1>Políticas del Negocio</h1>

      {/* Política de Privacidad */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Política de Privacidad</h2>
        <p className="success-p">
          En nuestro negocio, respetamos y protegemos la privacidad de nuestros
          clientes. Toda la información que recopilamos, como nombres,
          direcciones y detalles de contacto, se utiliza únicamente con el
          propósito de procesar pedidos y brindar un mejor servicio. No
          compartiremos ni venderemos su información personal a terceros.
        </p>

        <p className="success-p">
          <strong>Uso de WhatsApp como canal de contacto</strong>
          <br />
          En nuestro sitio web no realizamos envíos automáticos ni masivos de
          mensajes por WhatsApp. El número de WhatsApp publicado en nuestro
          sitio es exclusivamente un canal de contacto directo para atender
          consultas puntuales o gestionar dudas relacionadas con pedidos ya
          realizados. Solo nos comunicamos con clientes que previamente han
          iniciado contacto o han realizado una compra, y en ningún caso
          enviamos mensajes con fines promocionales sin consentimiento
          explícito. Todos los datos tratados en WhatsApp se limitan al
          contenido necesario para la atención al cliente, cumpliendo siempre
          con la normativa vigente y respetando la privacidad de nuestros
          usuarios.
        </p>
        <p className="success-p">
          Si tiene preguntas o inquietudes acerca de cómo manejamos sus datos,
          no dude en contactarnos en{" "}
          <a
            href="mailto:isaias92@hotmail.com.ar"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Click aqui
          </a>
          .
        </p>
      </section>

      {/* Términos y Condiciones */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Términos y Condiciones</h2>
        <p className="success-p">
          Al utilizar nuestros servicios o realizar una compra, acepta los
          siguientes términos y condiciones:
        </p>
        <ul>
          <li className="success-p">
            Todos los productos están sujetos a disponibilidad. Nos reservamos
            el derecho de modificar precios y descripciones en cualquier momento
            sin previo aviso.
          </li>
          <li className="success-p">
            El cliente es responsable de proporcionar información precisa para
            el procesamiento del pedido. No nos hacemos responsables por
            retrasos debido a información incorrecta.
          </li>
          <li className="success-p">
            El uso indebido de nuestros servicios o contenido puede resultar en
            la cancelación de su acceso.
          </li>
        </ul>
        <p className="success-p">
        <strong>Comunicaciones por WhatsApp</strong>
        <br />
El uso de WhatsApp en nuestra empresa se limita a la atención al cliente para resolver incidencias o responder consultas relacionadas con pedidos. En ningún caso utilizamos WhatsApp con fines publicitarios o de marketing.
Nos comprometemos a contactar únicamente a usuarios que hayan realizado una compra o hayan iniciado contacto, y a respetar cualquier solicitud de no ser contactados por este medio.
        </p>
      </section>

      {/* Política de Devoluciones */}
      <section style={{ marginBottom: "20px" }}>
        <h2>Política de Devoluciones</h2>
        <p className="success-p">
          Ofrecemos devoluciones y reembolsos bajo las siguientes condiciones:
        </p>
        <ul>
          <li className="success-p">
            Las devoluciones deben realizarse dentro de los 14 días posteriores
            a la recepción del producto.
          </li>
          <li className="success-p">
            El producto debe estar en su embalaje original y sin usar.
          </li>
          <li className="success-p">
            Los costos de envío no son reembolsables, a menos que el producto
            esté defectuoso o incorrecto.
          </li>
        </ul>
        <p className="success-p">
          Para iniciar una devolución, contáctenos en{" "}
          <a
            href="mailto:isaias92@hotmail.com.ar"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Click aqui
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default BusinessPolicies;
