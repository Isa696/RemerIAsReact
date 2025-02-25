import { useNavigate } from 'react-router-dom';
import { validateToken } from '../utils/validateToken';
import useUserStore from '../store/User';
import toast from 'react-hot-toast';

export const useRouteProtection = () => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  const checkAccess = () => {
    // Limpiar cualquier toast existente
    toast.remove();

    // Verificar usuario y token
    if (!user?.email || !validateToken()) {
      toast.error('Debes iniciar sesión para acceder al checkout');
      navigate('/login');
      return false;
    }

    return true;
  };

  return { checkAccess };
};