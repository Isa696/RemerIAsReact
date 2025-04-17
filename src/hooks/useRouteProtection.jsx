// utils/useRouteProtection.jsx
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/User';
import toast from 'react-hot-toast';

export const useRouteProtection = () => {
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);

  const checkAccess = () => {
    toast.remove();

    if (!user?.email || !user?.uid) {
      toast.error('Debes iniciar sesión para acceder a esta sección');
      navigate('/login');
      return false;
    }

    return true;
  };

  const checkAdminAccess = () => {
    toast.remove();
  
    if (!user?.isAdmin) {
      toast.error('Acceso restringido a administradores');
      navigate('/');
      return false;
    }
  
    return true;
  };

  return { checkAccess, checkAdminAccess };
};
