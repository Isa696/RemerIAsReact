import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { fetchAdmins } from '../../utils/fetchAdmins';
import useUserStore from '../../store/User';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function AuthWrapper({ children }) {
  const { user, logout } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          const adminUIDs = await fetchAdmins(); // Ahora devuelve un objeto { uid1: true, uid2: true }
          const isAdmin = !!adminUIDs[firebaseUser.uid];

          useUserStore.setState({
            user: {
              email: firebaseUser.email,
              uid: firebaseUser.uid,
              isAdmin,
            },
            idToken: token,
          });
        } catch (err) {
          console.error("Error cargando datos del usuario:", err);
          toast.error("Hubo un problema al cargar tu sesión.");
        }
      } else {
        logout();
        navigate("/login");
        toast.error("Sesión cerrada o expirada, por favor inicia sesión nuevamente.");
      }
    });

    return () => unsubscribe();
  }, [logout, navigate]);

  return children;
}

export default AuthWrapper;
