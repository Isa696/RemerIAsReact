import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '10px', background: 'var(--magnolia)' }}>
      <p>
        <Link to="/politicas-del-negocio">Ver nuestras Políticas del Negocio</Link>
      </p>
    </footer>
  );
};

export default Footer;
