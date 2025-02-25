import { useEffect } from 'react';
import { validateToken } from '../../utils/validateToken';
import useUserStore from '../../store/User';
import toast from 'react-hot-toast';

function AuthWrapper({ children }) {
  const { logout } = useUserStore();

  useEffect(() => {
    const checkToken = () => {
      const isValidToken = validateToken();
      if (!isValidToken) {
        logout();
        toast.error('Sesión expirada, por favor inicia sesión nuevamente');
      }
    };

    // Verificar token cada 5 minutos
    const interval = setInterval(checkToken, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [logout]);

  return children;
}

export default AuthWrapper;