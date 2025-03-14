const BusinessPolicies = () => {
  return (
    <div className="container"
      style={{ padding: '20px', fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
      <h1>Políticas del Negocio</h1>

      {/* Política de Privacidad */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Política de Privacidad</h2>
        <p className="success-p">
          En nuestro negocio, respetamos y protegemos la privacidad de nuestros clientes. Toda
          la información que recopilamos, como nombres, direcciones y detalles de contacto,
          se utiliza únicamente con el propósito de procesar pedidos y brindar un mejor
          servicio. No compartiremos ni venderemos su información personal a terceros.
        </p>
        <p className="success-p">
          Si tiene preguntas o inquietudes acerca de cómo manejamos sus datos, no dude en
          contactarnos en <a href="mailto:elparaisosanteria@gmail.com">elparaisosanteria@gmail.com</a>.
        </p>
      </section>

      {/* Términos y Condiciones */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Términos y Condiciones</h2>
        <p className="success-p">
          Al utilizar nuestros servicios o realizar una compra, acepta los siguientes
          términos y condiciones:
        </p>
        <ul>
          <li className="success-p">
            Todos los productos están sujetos a disponibilidad. Nos reservamos el derecho de
            modificar precios y descripciones en cualquier momento sin previo aviso.
          </li>
          <li className="success-p">
            El cliente es responsable de proporcionar información precisa para el
            procesamiento del pedido. No nos hacemos responsables por retrasos debido a
            información incorrecta.
          </li>
          <li className="success-p">
            El uso indebido de nuestros servicios o contenido puede resultar en la cancelación
            de su acceso.
          </li>
        </ul>
      </section>

      {/* Política de Devoluciones */}
      <section style={{ marginBottom: '20px' }}>
        <h2>Política de Devoluciones</h2>
        <p className="success-p">
          Ofrecemos devoluciones y reembolsos bajo las siguientes condiciones:
        </p>
        <ul>
          <li className="success-p">
            Las devoluciones deben realizarse dentro de los 14 días posteriores a la
            recepción del producto.
          </li >
          <li className="success-p">
            El producto debe estar en su embalaje original y sin usar.
          </li>
          <li className="success-p">
            Los costos de envío no son reembolsables, a menos que el producto esté defectuoso
            o incorrecto.
          </li>
        </ul>
        <p className="success-p">
          Para iniciar una devolución, contáctenos en{' '}
          <a href="mailto:elparaisosanteria@gmail.com">elparaisosanteria@gmail.com</a>.
        </p>
      </section>
    </div>
  );
};

export default BusinessPolicies;
